#include <iostream>
#include <vector>
#include <numeric> // For std::accumulate (optional for sum, can use a loop)

// Helper function to check if an element exists in a vector.
// This is needed to ensure our final list of distincts doesn't have duplicates.
bool isElementInVector(const std::vector<int>& vec, int element) {
    for (size_t i = 0; i < vec.size(); ++i) {
        if (vec[i] == element) {
            return true;
        }
    }
    return false;
}

// Function to find elements that are in one vector but not the other,
// using only vector operations and manual uniqueness checks for the result.
std::vector<int> findDistinctElementsSpicy(const std::vector<int>& vec1, const std::vector<int>& vec2) {
    std::vector<int> distinctElementsArray; // This will store our final distinct elements

    // --- Part 1: Find elements in vec1 that are not in vec2 ---
    for (size_t i = 0; i < vec1.size(); ++i) {
        int currentValFromVec1 = vec1[i];
        bool foundInVec2 = false;

        // Check if currentValFromVec1 exists in vec2
        for (size_t j = 0; j < vec2.size(); ++j) {
            if (currentValFromVec1 == vec2[j]) {
                foundInVec2 = true;
                break; // Found it, no need to check further in vec2
            }
        }

        if (!foundInVec2) {
            // currentValFromVec1 is not in vec2.
            // Now, we must ensure it's not already added to our distinctElementsArray
            // to prevent duplicates in the final result (e.g., if vec1 was {1,1,5} and vec2 was {10}).
            if (!isElementInVector(distinctElementsArray, currentValFromVec1)) {
                distinctElementsArray.push_back(currentValFromVec1);
            }
        }
    }

    // --- Part 2: Find elements in vec2 that are not in vec1 ---
    for (size_t i = 0; i < vec2.size(); ++i) {
        int currentValFromVec2 = vec2[i];
        bool foundInVec1 = false;

        // Check if currentValFromVec2 exists in vec1
        for (size_t j = 0; j < vec1.size(); ++j) {
            if (currentValFromVec2 == vec1[j]) {
                foundInVec1 = true;
                break; // Found it, no need to check further in vec1
            }
        }

        if (!foundInVec1) {
            // currentValFromVec2 is not in vec1.
            // Ensure it's not already added to distinctElementsArray.
            if (!isElementInVector(distinctElementsArray, currentValFromVec2)) {
                distinctElementsArray.push_back(currentValFromVec2);
            }
        }
    }

    return distinctElementsArray;
}

// Function to sum the distinct elements found
int sumTheDistinctElementsSpicy(const std::vector<int>& vec1, const std::vector<int>& vec2) {
    std::vector<int> distincts = findDistinctElementsSpicy(vec1, vec2);
    int sum = 0;
    for (size_t i = 0; i < distincts.size(); ++i) {
        sum += distincts[i];
    }
    // Alternative using std::accumulate from <numeric>
    // int sum = std::accumulate(distincts.begin(), distincts.end(), 0);
    return sum;
}

int main() {
    std::vector<int> arr1 = {1, 2, 3, 4, 5, 3}; // Added a duplicate '3' to arr1
    std::vector<int> arr2 = {4, 5, 6, 7, 8, 6}; // Added a duplicate '6' to arr2

    std::vector<int> distinctResult = findDistinctElementsSpicy(arr1, arr2);

    std::cout << "Distinct elements (Spicy Version): "; // Expected: 1, 2, 3, 7, 8, 6 (order might vary)
    for (size_t i = 0; i < distinctResult.size(); ++i) {
        std::cout << distinctResult[i] << " ";
    }
    std::cout << std::endl;

    int sumResult = sumTheDistinctElementsSpicy(arr1, arr2);
    // Expected sum for {1,2,3,7,8,6} is 1+2+3+7+8+6 = 27
    std::cout << "Sum of distinct elements (Spicy Version): " << sumResult << std::endl;

    std::vector<int> arr3 = {10, 20, 30, 20, 10}; // Duplicates
    std::vector<int> arr4 = {20, 40, 50, 10, 40}; // Duplicates
    // vec1 unique to vec2: 30
    // vec2 unique to vec1: 40, 50
    // Distinct elements: 30, 40, 50 (order may vary)
    // Sum: 30 + 40 + 50 = 120

    distinctResult = findDistinctElementsSpicy(arr3, arr4);
    std::cout << "Distinct elements (arr3 vs arr4 Spicy): ";
    for (size_t i = 0; i < distinctResult.size(); ++i) {
        std::cout << distinctResult[i] << " ";
    }
    std::cout << std::endl;

    sumResult = sumTheDistinctElementsSpicy(arr3, arr4);
    std::cout << "Sum of distinct elements (arr3 vs arr4 Spicy): " << sumResult << std::endl;

    std::vector<int> arr5 = {1,1,1};
    std::vector<int> arr6 = {2,2,2};
    // Distinct: 1, 2. Sum: 3
     distinctResult = findDistinctElementsSpicy(arr5, arr6);
    std::cout << "Distinct elements (arr5 vs arr6 Spicy): ";
    for (size_t i = 0; i < distinctResult.size(); ++i) {
        std::cout << distinctResult[i] << " ";
    }
    std::cout << std::endl;

    sumResult = sumTheDistinctElementsSpicy(arr5, arr6);
    std::cout << "Sum of distinct elements (arr5 vs arr6 Spicy): " << sumResult << std::endl;


    return 0;
}