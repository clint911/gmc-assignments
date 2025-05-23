package clinton;

import java.util.ArrayList;
import java.util.HashSet; // Using a HashSet for the final collection to ensure uniqueness.
import java.util.List;
import java.util.Set;

public class SumDistinctElements {

    // Function to find elements that are in one array but not the other
    public int[] findDistinctElements(int[] arr1, int[] arr2) {
        Set<Integer> distinctElementsSet = new HashSet<>();

        // 1. Find elements in arr1 that are not in arr2
        for (int i = 0; i < arr1.length; i++) {
            boolean foundInArr2 = false;
            for (int j = 0; j < arr2.length; j++) {
                if (arr1[i] == arr2[j]) {
                    foundInArr2 = true;
                    break; // arr1[i] is not unique to arr1, move to next arr1 element
                }
            }
            if (!foundInArr2) {
                distinctElementsSet.add(arr1[i]);
            }
        }

        // 2. Find elements in arr2 that are not in arr1
        for (int i = 0; i < arr2.length; i++) {
            boolean foundInArr1 = false;
            for (int j = 0; j < arr1.length; j++) {
                if (arr2[i] == arr1[j]) {
                    foundInArr1 = true;
                    break; // arr2[i] is not unique to arr2, move to next arr2 element
                }
            }
            if (!foundInArr1) {
                distinctElementsSet.add(arr2[i]);
            }
        }

        // Convert the Set to an int array
        int[] result = new int[distinctElementsSet.size()];
        int index = 0;
        for (Integer val : distinctElementsSet) {
            result[index++] = val;
        }
        return result;
    }

    // Function to sum the distinct elements found
    public int sumTheDistinctElements(int[] arr1, int[] arr2) {
        int[] distincts = findDistinctElements(arr1, arr2);
        int sum = 0;
        for (int val : distincts) {
            sum += val;
        }
        return sum;
    }
}