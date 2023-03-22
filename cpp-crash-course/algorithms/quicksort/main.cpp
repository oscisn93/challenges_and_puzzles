#include <vector>
#include <algorithm>
#include <iostream>


void print(std::vector<int> &v) {
    for (int n: v) {
        std::cout << n <<" ";
    }
    std::cout << "\n";
}

int partition(std::vector<int> &v, int left, int right) {
    int pivot = v[left];
    int start = left - 1;
    int end = right;
    while (true) {
        while (v[end] > pivot) end--;
        while (v[start] < pivot) start++;
        if (start < end) {
            std::iter_swap(v.begin() + start, v.begin() + end);
            start++;
            end--;
        } else return end;
    }
}

void quicksort(std::vector<int> &v, int left, int right) {
    if (left < right) {
        int p_index = partition(v, left, right);
        quicksort(v, left, p_index);
        quicksort(v, p_index + 1, right);
    }
}

int main() {
    std::vector<int> numbers = {6,3,2,1,5,9,8,15};
    print(numbers);
    quicksort(numbers, 0, numbers.size() - 1);
    print(numbers);
}

/*
    communicate how you are feeling instead of assuming that they know
    whats going on in your head.
*/