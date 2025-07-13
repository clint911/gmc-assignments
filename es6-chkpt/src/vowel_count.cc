#include <string>

using namespace std;

int getCount(const string& inputStr){
  int num_vowels = 0;
    // Loop through each character in the string
  for(size_t i = 0; i < inputStr.length(); i++) {
    char c = inputStr[i];
    if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') {
            num_vowels++;
        }
  }
  return num_vowels;
}