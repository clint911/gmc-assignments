package clinton;
import java.util.ArrayList; // Required for using ArrayList to represent vectors
import java.util.InputMismatchException; // Required for handling input errors & Input Sanitization
import java.util.List; // Required for using List interface
import java.util.Scanner; // Required for input operations

/**
 * @brief This class provides methods to calculate the dot product of vectors
 * and determine their orthogonality, demonstrating both a procedure-like
 * (void method with pass-by-reference effect) and a function-like (return value)
 * approach.
 */
public class DotProductCalculator {

    // Define a small epsilon value for floating-point comparisons.
    // This value is used to check if a double is effectively zero.
    private static final double EPSILON = 1e-9;

    /**
     * @brief Calculates the dot product of two vectors and stores the result
     * in a passed-by-reference-like variable (by modifying an array element or a mutable object).
     * In Java, primitive types are passed by value. To simulate an 'OUT' parameter for a primitive,
     * we can pass a single-element array or a mutable wrapper object. Here, we use a double array
     * to hold the result.
     *
     * @param v1 The first vector (read-only input).
     * @param v2 The second vector (read-only input).
     * @param ps A double array of size 1 where the calculated dot product will be stored (output).
     * The result will be in ps[0].
     */
    public static void dotProductProcedure(List<Double> v1, List<Double> v2, double[] ps) {
        // Pre-condition check: Ensure vectors have the same size.
        // If sizes differ, the dot product is not mathematically defined in this context.
        if (v1.size() != v2.size()) {
            System.err.println("Error: Vectors must have the same dimension for dot product calculation.");
            if (ps.length > 0) {
                ps[0] = 0.0; // Assign a default value or handle error appropriately
            }
            return;
        }

        double sum = 0.0;
        // Iterate through the elements of the vectors
        for (int i = 0; i < v1.size(); ++i) {
            sum += v1.get(i) * v2.get(i);
        }

        // Assign the calculated sum to the output parameter 'ps' (first element of the array)
        if (ps.length > 0) {
            ps[0] = sum;
        }
    }

    /**
     * @brief Algorithm to determine orthogonality for N pairs of vectors using the
     * dotProductProcedure.
     * This method prompts the user for the number of vector pairs, their dimensions,
     * and their elements. It then calls the dotProductProcedure for each pair
     * and checks for orthogonality.
     *
     * @param scanner The Scanner object to use for reading user input.
     */
    public static void checkOrthogonalityUsingProcedure(Scanner scanner) {
        int n; // Number of vector pairs to process
        System.out.println("--- Using Procedure Approach ---");
        System.out.print("Enter the number of pairs of vectors (n): ");
        try {
            n = scanner.nextInt();
        } catch (InputMismatchException e) {
            System.err.println("Invalid input. Please enter an integer for 'n'. Exiting.");
            scanner.next(); // Consume the invalid input
            return;
        }

        // Outer loop: Iterate 'n' times for each pair of vectors
        for (int i = 1; i <= n; ++i) {
            System.out.println("\n--- Processing Pair " + i + " ---");

            int vSize; // Size of the vectors (dimension)
            System.out.print("Enter the size (dimension) of the vectors: ");
            try {
                vSize = scanner.nextInt();
            } catch (InputMismatchException e) {
                System.err.println("Invalid input. Please enter an integer for vector size. Skipping this pair.");
                scanner.next(); // Consume the invalid input
                continue; // Skip to the next pair
            }

            // Input for vector v1
            List<Double> v1 = new ArrayList<>(); // Dynamically allocate vector using ArrayList
            System.out.println("Enter " + vSize + " elements for vector v1, one by one:");
            // Inner loop: Read elements for v1
            for (int j = 0; j < vSize; ++j) {
                System.out.print("v1[" + j + "]: ");
                try {
                    v1.add(scanner.nextDouble());
                } catch (InputMismatchException e) {
                    System.err.println("Invalid input. Please enter a number. Skipping this pair.");
                    scanner.next(); // Consume the invalid input
                    // Clear v1 and break to prevent further input for this pair
                    v1.clear(); 
                    break; 
                }
            }
            if (v1.size() != vSize) continue; // If input was invalid, skip to next pair

            // Input for vector v2
            List<Double> v2 = new ArrayList<>(); // v2 must have the same size as v1
            System.out.println("Enter " + vSize + " elements for vector v2, one by one:");
            // Inner loop: Read elements for v2
            for (int j = 0; j < vSize; ++j) {
                System.out.print("v2[" + j + "]: ");
                try {
                    v2.add(scanner.nextDouble());
                } catch (InputMismatchException e) {
                    System.err.println("Invalid input. Please enter a number. Skipping this pair.");
                    scanner.next(); // Consume the invalid input
                    // Clear v2 and break to prevent further input for this pair
                    v2.clear(); 
                    break; 
                }
            }
            if (v2.size() != vSize) continue; // If input was invalid, skip to next pair

            double[] scalarProductHolder = new double[1]; // Array to hold the result from the procedure

            // Call the dotProductProcedure
            // v1 and v2 are passed by value (references are copied, but the lists themselves are mutable)
            // scalarProductHolder is passed by value (its reference is copied), but the array contents are mutable
            dotProductProcedure(v1, v2, scalarProductHolder);
            double scalarProduct = scalarProductHolder[0];

            System.out.printf("Calculated Dot Product for Pair %d: %.6f%n", i, scalarProduct);

            // Check for orthogonality using the defined EPSILON for floating-point comparison.
            if (Math.abs(scalarProduct) < EPSILON) {
                System.out.println("Result: Vectors are orthogonal.");
            } else {
                System.out.println("Result: Vectors are NOT orthogonal.");
            }
        }

        System.out.println("\nOrthogonality check completed for all " + n + " pairs using procedure.");
    }

    /**
     * @brief Calculates the dot product of two vectors and returns the result.
     * This function takes two constant reference-like vectors (List<Double>)
     * and returns the calculated dot product.
     *
     * @param v1 The first vector (read-only input).
     * @param v2 The second vector (read-only input).
     * @return The dot product of v1 and v2 as a double.
     */
    public static double dotProductFunction(List<Double> v1, List<Double> v2) {
        // Pre-condition check: Ensure vectors have the same size.
        if (v1.size() != v2.size()) {
            System.err.println("Error: Vectors must have the same dimension for dot product calculation.");
            return 0.0; // Return a default value or throw an exception
        }

        double sum = 0.0;
        // Iterate through the elements of the vectors
        for (int i = 0; i < v1.size(); ++i) {
            sum += v1.get(i) * v2.get(i);
        }

        // Return the calculated sum
        return sum;
    }

    /**
     * @brief Algorithm to determine orthogonality for N pairs of vectors using the
     * dotProductFunction.
     * This method prompts the user for the number of vector pairs, their dimensions,
     * and their elements. It then calls the dotProductFunction for each pair
     * and checks for orthogonality.
     *
     * @param scanner The Scanner object to use for reading user input.
     */
    public static void checkOrthogonalityUsingFunction(Scanner scanner) {
        int n; // Number of vector pairs to process
        System.out.println("\n--- Using Function Approach ---");
        System.out.print("Enter the number of pairs of vectors (n): ");
        try {
            n = scanner.nextInt();
        } catch (InputMismatchException e) {
            System.err.println("Invalid input. Please enter an integer for 'n'. Exiting.");
            scanner.next(); // Consume the invalid input
            return;
        }

        // Outer loop: Iterate 'n' times for each pair of vectors
        for (int i = 1; i <= n; ++i) {
            System.out.println("\n--- Processing Pair " + i + " ---");

            int vSize; // Size of the vectors (dimension)
            System.out.print("Enter the size (dimension) of the vectors: ");
            try {
                vSize = scanner.nextInt();
            } catch (InputMismatchException e) {
                System.err.println("Invalid input. Please enter an integer for vector size. Skipping this pair.");
                scanner.next(); // Consume the invalid input
                continue; // Skip to the next pair
            }

            // Input for vector v1
            List<Double> v1 = new ArrayList<>();
            System.out.println("Enter " + vSize + " elements for vector v1, one by one:");
            for (int j = 0; j < vSize; ++j) {
                System.out.print("v1[" + j + "]: ");
                try {
                    v1.add(scanner.nextDouble());
                } catch (InputMismatchException e) {
                    System.err.println("Invalid input. Please enter a number. Skipping this pair.");
                    scanner.next(); // Consume the invalid input
                    v1.clear();
                    break;
                }
            }
            if (v1.size() != vSize) continue;

            // Input for vector v2
            List<Double> v2 = new ArrayList<>();
            System.out.println("Enter " + vSize + " elements for vector v2, one by one:");
            for (int j = 0; j < vSize; ++j) {
                System.out.print("v2[" + j + "]: ");
                try {
                    v2.add(scanner.nextDouble());
                } catch (InputMismatchException e) {
                    System.err.println("Invalid input. Please enter a number. Skipping this pair.");
                    scanner.next(); // Consume the invalid input
                    v2.clear();
                    break;
                }
            }
            if (v2.size() != vSize) continue;

            // Call the dotProductFunction
            // v1 and v2 are passed by value (references are copied).
            // The function returns the result, which is then assigned to scalarProduct.
            double scalarProduct = dotProductFunction(v1, v2);

            System.out.printf("Calculated Dot Product for Pair %d: %.6f%n", i, scalarProduct);

            // Check for orthogonality.
            if (Math.abs(scalarProduct) < EPSILON) {
                System.out.println("Result: Vectors are orthogonal.");
            } else {
                System.out.println("Result: Vectors are NOT orthogonal.");
            }
        }

        System.out.println("\nOrthogonality check completed for all " + n + " pairs using function.");
    }

    /**
     * @brief Main method where the program execution begins.
     * This method creates a Scanner object and calls both orthogonality checking
     * algorithms to demonstrate both the procedure-based and function-based approaches.
     *
     * @param args Command line arguments (not used in this program).
     */
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in); // Create a single Scanner object for input

        // Call the algorithm using the procedure approach
        checkOrthogonalityUsingProcedure(scanner);

        System.out.println("\n---------------------------------------------------");

        // Call the algorithm using the function approach
        checkOrthogonalityUsingFunction(scanner);

        scanner.close(); // Close the scanner to release system resources
    }
}
