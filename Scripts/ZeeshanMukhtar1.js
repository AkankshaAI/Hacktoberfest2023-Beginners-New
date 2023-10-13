function bubbleSort(arr) {
  // Get the length of the array
  const n = arr.length;

  // Outer loop to iterate through the entire array
  for (let i = 0; i < n - 1; i++) {
    // Inner loop to perform comparisons and swaps
    // The inner loop runs for n - i - 1 times because the largest i elements are already sorted
    for (let j = 0; j < n - i - 1; j++) {
      // Compare adjacent elements
      if (arr[j] > arr[j + 1]) {
        // Swap if the current element is greater than the next element
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}

// Example usage:
const arrayToSort = [64, 34, 25, 12, 22, 11, 90];
bubbleSort(arrayToSort);
console.log('Sorted array: ' + arrayToSort);
