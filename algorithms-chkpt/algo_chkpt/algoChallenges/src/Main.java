import clinton.SumDistinctElements;

public class Main {
    public static void main(String[] args) {
    
        SumDistinctElements sde = new SumDistinctElements();
        int[] arr1 = {1, 2, 3, 4, 5};
        int[] arr2 = {4, 5, 6, 7, 8};

        int[] distinctResult = sde.findDistinctElements(arr1, arr2);
        System.out.print("Distinct elements: "); // Expected: 1, 2, 3, 6, 7, 8 (order may vary)
        for (int val : distinctResult) {
            System.out.print(val + " ");
        }
        System.out.println();

        int sumResult = sde.sumTheDistinctElements(arr1, arr2);
        System.out.println("Sum of distinct elements: " + sumResult); // Expected: 1+2+3+6+7+8 = 27
    }
}