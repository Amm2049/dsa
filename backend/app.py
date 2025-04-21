from flask import Flask, request, jsonify
from queue_manager import QueueManager
from merge_sort import merge_sort
from stack_manager import Stack
import bisect
import datas
import random
from flask_cors import CORS
from binary_search import binary_search

app = Flask(__name__)
CORS(app)

queue_manager = QueueManager()
stack_manager = Stack()
favorites_queue = []  # Array: To manage the favorite playlist
current_song_index = -1  # Index of the currently playing song in favorites_queue
is_playing = False  # Playback state
songs_collection = datas.songs

# fetching datas at the start of app
@app.route('/fetchDatas', methods=['GET'])
def fetchDatas():
    return jsonify({"all": songs_collection, "recommend": random.sample(songs_collection, 14),
            "queue": queue_manager.get_current_queue(),
            "popular": sorted(songs_collection, key=lambda song: song["popularity"], reverse=True)[:30]})  # No match found


# searching the song - binary search -------------------------------------
@app.route('/search', methods=['POST'])
def search():
    """
    API endpoint to search for a song by its unique ID.
    Query parameter: 'q' (the song ID to search for).
    Returns: The matching song object or an empty list if no match is found.
    """
    ids = request.get_json()['ids']
    if len(ids) == 0:
        return jsonify({  'results': songs_collection}), 200
    
    searched_songs = []
    for id in ids:
        song = binary_search(songs_collection, id)  # Find the song by ID
        if song:
            searched_songs.append(song)  # Add the song to the result list
        
    return jsonify({  'results': searched_songs}), 200


# sorting the songs
@app.route('/sort/latest', methods=['GET'])
def sort_latest():
    """API to sort songs by release date (newest first)."""
    sorted_songs = merge_sort(songs_collection, key=lambda x: x["release_date"], reverse=True)
    return jsonify({"results": sorted_songs[:30]})

@app.route('/sort/popular', methods=['GET'])
def sort_popular():
    """API to sort songs by popularity (highest first)."""
    sorted_songs = merge_sort(songs_collection, key=lambda x: x["popularity"], reverse=True)
    return jsonify({"results": sorted_songs[:30]})

@app.route('/sort/a-z', methods=['GET'])
def sort_artist():
    """API to sort songs alphabetically by artist name."""
    sorted_songs = merge_sort(songs_collection, key=lambda x: x["track_name"].lower())
    return jsonify({"results": sorted_songs[:30]})

# Queue to play -----------------------------------------------------------
# Initialize the QueueManager instance

@app.route('/queue/add', methods=['POST'])
def add_to_queue_api():
    """
    API endpoint to add a song to the queue.
    Request Body: {"id": <song_id>}
    """
    data = request.get_json()

    if data['song'] not in queue_manager.get_current_queue():
        queue_manager.add_to_queue(data['song'])
    
    return jsonify({"message": f"Song with ID {data['song']['id']} has been added to the queue.", 'data': queue_manager.get_current_queue()}), 200

@app.route('/queue/remove', methods=['POST'])
def remove_from_queue_api():
    """
    API endpoint to remove a song from the queue.
    Request Body: {"id": <song_id>}
    """
    data = request.get_json()
    if not data or "id" not in data:
        return jsonify({"error": "Invalid request. 'id' is required."}), 400
    
    song_id = data["id"]

    if not any(song["id"] == song_id for song in queue_manager.get_current_queue()):
        return jsonify({"error": f"Song with ID {song_id} is not in the queue."}), 400

    queue_manager.remove_from_queue(song_id)
    return jsonify({"message": f"Song with ID {song_id} has been removed from the queue.", 'data': queue_manager.get_current_queue()}), 200


@app.route('/queue/play-next', methods=['POST'])
def play_next_song_api():
    
    # Add to history
    stack_manager.push(queue_manager.get_current_queue()[0])

    queue_manager.remove_first()
    queue = queue_manager.get_current_queue()
    if len(queue) == 0:
        stack_manager.items = []

    return jsonify({"message": f"First song has been removed from the queue.", 'queueData': queue, 'historyData': stack_manager.items }), 200

@app.route('/queue/play-pre', methods=['POST'])
def play_pre_song_api():
    
    # insert into queue top
    add_to_queue = stack_manager.peek()
    queue_manager.insert_at_front(add_to_queue)
    
    # pop from stack
    stack_manager.pop()

    queue = queue_manager.get_current_queue()

    return jsonify({"message": f"First song has been removed from the queue.", 'queueData': queue, 'historyData': stack_manager.items }), 200

if __name__ == '__main__':
    app.run(debug=True)