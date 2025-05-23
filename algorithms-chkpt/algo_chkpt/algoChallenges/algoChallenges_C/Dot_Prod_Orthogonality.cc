#include <iostream> // Required for input/output operations (cin, cout)
#include <vector>   // Required for using std::vector to represent vectors
#include <cmath>    // Required for std::abs (absolute value)
#include <limits>   // Required for std::numeric_limits (for epsilon comparison)
#include <iomanip>  // Required for std::fixed and std::setprecision for output formatting

// Define a small epsilon value for floating-point comparisons.
// Using machine epsilon for double precision, or a slightly larger value like 1e-9.
const double EPSILON = 1e-9; 

/**
 * @brief Calculates the dot product of two vectors and stores the result
 * in a passed-by-reference variable.
 * * This function takes two constant reference vectors (to avoid copying large vectors)
 * and an output parameter 'ps' passed by reference. It calculates the dot product
 * and assigns it directly to 'ps'.
 * * @param v1 The first vector (read-only input).
 * @param v2 The second vector (read-only input).
 * @param ps A reference to a double variable where the calculated dot product will be stored (output).
 */
void dot_product_procedure(const std::vector<double>& v1, const std::vector<double>& v2, double& ps) {
    // Pre-condition check: Ensure vectors have the same size.
    // If sizes differ, the dot product is not mathematically defined in this context.
    if (v1.size() != v2.size()) {
        std::cerr << "Error: Vectors must have the same dimension for dot product calculation." << std::endl;
        ps = 0.0; // Assign a default value or handle error appropriately
        return;
    }

    double sum = 0.0;
    // Iterate through the elements of the vectors
    for (size_t i = 0; i < v1.size(); ++i) {
        sum += v1[i] * v2[i];
    }

    // Assign the calculated sum to the output parameter 'ps'
    ps = sum;
}

/**
 * @brief Algorithm to determine orthogonality for N pairs of vectors using the
 * dot_product_procedure.
 * * This function prompts the user for the number of vector pairs, their dimensions,
 * and their elements. It then calls the dot_product_procedure for each pair
 * and checks for orthogonality.
 */
void checkOrthogonalityUsingProcedure() {
    int n; // Number of vector pairs to process
    std::cout << "--- Using Procedure Approach ---" << std::endl;
    std::cout << "Enter the number of pairs of vectors (n): ";
    std::cin >> n;

    // Outer loop: Iterate 'n' times for each pair of vectors
    for (int i = 1; i <= n; ++i) {
        std::cout << "\n--- Processing Pair " << i << " ---" << std::endl;

        int v_size; // Size of the vectors (dimension)
        std::cout << "Enter the size (dimension) of the vectors: ";
        std::cin >> v_size;

        // Input for vector v1
        std::vector<double> v1(v_size); // Dynamically allocate vector based on size
        std::cout << "Enter " << v_size << " elements for vector v1, one by one:" << std::endl;
        // Inner loop: Read elements for v1
        for (int j = 0; j < v_size; ++j) {
            std::cout << "v1[" << j << "]: ";
            std::cin >> v1[j];
        }

        // Input for vector v2
        std::vector<double> v2(v_size); // v2 must have the same size as v1
        std::cout << "Enter " << v_size << " elements for vector v2, one by one:" << std::endl;
        // Inner loop: Read elements for v2
        for (int j = 0; j < v_size; ++j) {
            std::cout << "v2[" << j << "]: ";
            std::cin >> v2[j];
        }

        double scalar_product; // Variable to store the dot product result

        // Call the dot_product_procedure
        // v1 and v2 are passed by const reference (efficient, no copy, read-only access)
        // scalar_product is passed by reference (allows the procedure to modify it)
        dot_product_procedure(v1, v2, scalar_product);

        std::cout << "Calculated Dot Product for Pair " << i << ": " 
                  << std::fixed << std::setprecision(6) << scalar_product << std::endl;

        // Check for orthogonality using the defined EPSILON for floating-point comparison.
        if (std::abs(scalar_product) < EPSILON) {
            std::cout << "Result: Vectors are orthogonal." << std::endl;
        } else {
            std::cout << "Result: Vectors are NOT orthogonal." << std::endl;
        }
    }

    std::cout << "\nOrthogonality check completed for all " << n << " pairs using procedure." << std::endl;
}


/**
 * @brief Calculates the dot product of two vectors and returns the result.
 * * This function takes two constant reference vectors (to avoid copying large vectors)
 * and returns the calculated dot product.
 * * @param v1 The first vector (read-only input).
 * @param v2 The second vector (read-only input).
 * @return The dot product of v1 and v2 as a double.
 */
double dot_product_function(const std::vector<double>& v1, const std::vector<double>& v2) {
    // Pre-condition check: Ensure vectors have the same size.
    if (v1.size() != v2.size()) {
        std::cerr << "Error: Vectors must have the same dimension for dot product calculation." << std::endl;
        return 0.0; // Return a default value or throw an exception
    }

    double sum = 0.0;
    // Iterate through the elements of the vectors
    for (size_t i = 0; i < v1.size(); ++i) {
        sum += v1[i] * v2[i];
    }

    // Return the calculated sum
    return sum;
}

/**
 * @brief Algorithm to determine orthogonality for N pairs of vectors using the
 * dot_product_function.
 * * This function prompts the user for the number of vector pairs, their dimensions,
 * and their elements. It then calls the dot_product_function for each pair
 * and checks for orthogonality.
 */
void checkOrthogonalityUsingFunction() {
    int n; // Number of vector pairs to process
    std::cout << "\n--- Using Function Approach ---" << std::endl;
    std::cout << "Enter the number of pairs of vectors (n): ";
    std::cin >> n;

    // Outer loop: Iterate 'n' times for each pair of vectors
    for (int i = 1; i <= n; ++i) {
        std::cout << "\n--- Processing Pair " << i << " ---" << std::endl;

        int v_size; // Size of the vectors (dimension)
        std::cout << "Enter the size (dimension) of the vectors: ";
        std::cin >> v_size;

        // Input for vector v1
        std::vector<double> v1(v_size);
        std::cout << "Enter " << v_size << " elements for vector v1, one by one:" << std::endl;
        for (int j = 0; j < v_size; ++j) {
            std::cout << "v1[" << j << "]: ";
            std::cin >> v1[j];
        }

        // Input for vector v2
        std::vector<double> v2(v_size);
        std::cout << "Enter " << v_size << " elements for vector v2, one by one:" << std::endl;
        for (int j = 0; j < v_size; ++j) {
            std::cout << "v2[" << j << "]: ";
            std::cin >> v2[j];
        }

        // Call the dot_product_function
        // v1 and v2 are passed by const reference.
        // The function returns the result, which is then assigned to scalar_product.
        double scalar_product = dot_product_function(v1, v2);

        std::cout << "Calculated Dot Product for Pair " << i << ": " 
                  << std::fixed << std::setprecision(6) << scalar_product << std::endl;

        // Check for orthogonality.
        if (std::abs(scalar_product) < EPSILON) {
            std::cout << "Result: Vectors are orthogonal." << std::endl;
        } else {
            std::cout << "Result: Vectors are NOT orthogonal." << std::endl;
        }
    }

    std::cout << "\nOrthogonality check completed for all " << n << " pairs using function." << std::endl;
}

/**
 * @brief Main function where the program execution begins.
 * * This function calls both orthogonality checking algorithms to demonstrate
 * both the procedure-based and function-based approaches.
 */
int main() {
    // Optimize C++ streams for faster input/output.
    std::ios_base::sync_with_stdio(false);
    std::cin.tie(NULL);

    // Call the algorithm using the procedure approach
    checkOrthogonalityUsingProcedure();

    std::cout << "\n---------------------------------------------------" << std::endl;

    // Call the algorithm using the function approach
    checkOrthogonalityUsingFunction();

    return 0; // Indicate successful program execution
}
