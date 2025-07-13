#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

vector<int> minMax(const vector<int>& arr) {
    auto p = minmax_element(arr.begin(), arr.end());
    return {*p.first, *p.second};
}

int main() {
    // Test cases
    vector<vector<int>> testCases = {
        {1, 2, 3, 4, 5},
        {2334454, 5},
        {1},
        {0, 0, 0, 0},
        {-10, 5, 20, -30}
    };

    for (const auto& testCase : testCases) {
        vector<int> result = minMax(testCase);
        cout << "[";
        for (size_t i = 0; i < testCase.size(); ++i) {
            cout << testCase[i];
            if (i < testCase.size() - 1) cout << ", ";
        }
        cout << "] ➞ ";
        cout << "[" << result[0] << ", " << result[1] << "]" << endl;
    }

    return 0;
}