#include<iostream>
using namespace std;

class Solution
{
    public:
    //Function to sort an array using quick sort algorithm.
    void quickSort(int arr[], int low, int high)
    {
        // code here
        if(low < high) {
            int pindx = partition(arr, low, high);

            quickSort(arr, low, pindx - 1);
            quickSort(arr, pindx + 1, high);
        }
    }
    
    public:
    int partition (int arr[], int low, int high)
    {
       // Your code here
        int pivot = arr[high];
        int i = low - 1;
    
        for(int j = low; j < high; j++) {
            if(arr[j] < pivot) {
                i++;                        //swap
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        
        i++;
        int temp = arr[i];
        arr[i] = pivot;
        arr[high] = temp;
    
        return i; 
    }
};