def binary_search(arr, target):
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = (left + right) // 2

        if arr[mid] == target:
            return mid  # Element found, return its index
        elif arr[mid] < target:
            left = mid + 1  # Adjust the left bound
        else:
            right = mid - 1  # Adjust the right bound

    return -1  # Element not found in the array

# Example usage (same as before)
