class QueueManager:
    def __init__(self):
        """
        Initialize the QueueManager with an empty queue and playback state.
        """
        self.queue_to_play = []  # List to act as a queue (FIFO)
        self.current_song_index = -1  # Index of the currently playing song (-1 means no song is playing)
        self.is_playing = False  # Playback state

    def add_to_queue(self, song):
        """
        Add a song to the queue.
        :param song: The song object to add.
        """
        self.queue_to_play.append(song)
        
    def insert_at_front(self, item):
        """Insert an item at the front of the queue."""
        self.queue_to_play.insert(0, item)
        
    def remove_first(self):
        """ Remove the first song of the queue. """
        self.queue_to_play.pop(0)

    def remove_from_queue(self, song_id):
        """
        Remove a song from the queue by its ID.
        :param song_id: The ID of the song to remove.
        """
        self.queue_to_play = [song for song in self.queue_to_play if song["id"] != song_id]

    def get_current_queue(self):
        """
        Return the current queue.
        :return: The list of songs in the queue.
        """
        return self.queue_to_play

    # def play_next_song(self):
    #     """
    #     Play the next song in the queue.
    #     :return: The next song to play or None if the queue is empty.
    #     """
    #     if self.current_song_index + 1 < len(self.queue_to_play):
    #         self.current_song_index += 1
    #         self.is_playing = True
    #         return self.queue_to_play[self.current_song_index]
    #     else:
    #         self.is_playing = False
    #         return None