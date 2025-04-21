# sorting algorithms
def merge_sort(arr, key=lambda x: x, reverse=False):
    """
    Generic Merge Sort implementation.
    - arr: List to sort.
    - key: Function to extract the sorting key.
    - reverse: If True, sorts in descending order.
    """
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid], key, reverse)
    right = merge_sort(arr[mid:], key, reverse)

    return merge(left, right, key, reverse)

def merge(left, right, key, reverse):
    result = []
    i = j = 0

    while i < len(left) and j < len(right):
        # Compare based on the key function
        left_val = key(left[i])
        right_val = key(right[j])

        if (left_val < right_val) ^ reverse:  # XOR handles ascending/descending
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])
    return result
