#include <iostream>
#include <vector>

// Function to partition the array into two sub-arrays.
int partition(std::vector<int>& arr, int low, int high)
{
    int pivot = arr[high];  // Choose the last element as the pivot.
    int i = (low - 1);  // Index of the smaller element.
    int arrSize = arr.size();
    for (int j = low; j < high; j++) 
    {
        if (arr[j] < pivot) 
        {
            i++;
            std::swap(arr[i], arr[j]);
        }
    }

    std::swap(arr[i + 1], arr[high]);
    std::cout << "\nArray after swapping : ";
    for (int i = 0; i < arrSize; i++) 
    {
        std::cout << arr[i] << " ";
    }
    return (i + 1);
}

// Function to perform the quicksort.
void quicksort(std::vector<int>& arr, int low, int high) 
{
    if (low < high) 
    {
        // Find the partitioning index.
        int pi = partition(arr, low, high);

        // Recursively sort the elements before and after the partition.
        quicksort(arr, low, pi - 1);
        quicksort(arr, pi + 1, high);
    }
}

int main() 
{
    std::vector<int> arr = {12, 11, 13, 5, 6, 7,44,20};

    int arrSize = arr.size();

    std::cout << "Original Array: ";
    for (int i = 0; i < arrSize; i++) 
    {
        std::cout << arr[i] << " ";
    }

    quicksort(arr, 0, arrSize - 1);

    std::cout << "\nSorted Array: ";
    for (int i = 0; i < arrSize; i++) 
    {
        std::cout << arr[i] << " ";
    }

    return 0;
}

