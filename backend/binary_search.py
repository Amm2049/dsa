def binary_search(songs, target_id):
    left, right = 0, len(songs) - 1

    while left <= right:
        mid = (left + right) // 2
        mid_id = songs[mid]["id"]

        if mid_id == target_id:
            return songs[mid]  # Song found
        elif mid_id < target_id:
            left = mid + 1  # Search in the right half
        else:
            right = mid - 1  # Search in the left half

    return None  # Song not found