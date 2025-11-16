## 📘 Table of Contents
- [Method 1: Brute Force (O(n³))](#method-1-brute-force-on³)
- [Method 2: Prefix Sum Optimization (O(n²))](#method-2-prefix-sum-optimization-on²)
- [Method 3: Jump Optimization (~O(n√n))](#method-3-jump-optimization-on√n)
- [Final Complexity Comparison](#final-complexity-comparison)


## Method 1: Brute Force (O(n³))

class Solution {
public:
    int numberOfSubstrings(string s) {
    
        /* --------------------------------------------------------------------
           METHOD 1: Pure Brute Force  — O(n³)
           --------------------------------------------------------------------
           Idea:
           • Generate every possible substring s[i..j].
           • Inside each substring, count zeros and ones manually.
           • Check the condition:  (zero * zero) <= one.

           Why is this slow?
           • Three nested loops:
                i → O(n)
                j → O(n)
                k → O(n)
             Total = O(n³)

           This method helps us understand the problem but will Exceed the Time Limit.
        -------------------------------------------------------------------- */

        int n = s.size(), result = 0;

        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {

                int zero = 0, one = 0;

                for (int k = i; k <= j; k++) {
                    if (s[k] == '0') zero++;
                    else one++;
                }

                if (zero * zero <= one)
                    result++;
            }
        }

        // return result;   // (Commented so Method 2 can execute below)
        ```

## Method 2: Prefix Sum Optimization (O(n²))


        /* --------------------------------------------------------------------
           METHOD 2: Using Prefix Sum  — O(n²)
           --------------------------------------------------------------------
           Why do we use prefix sum?
           • Inside every substring s[i..j], counting ones repeatedly is expensive.
           • Prefix sum lets us find number of ones in O(1):
                 ones(i..j) = prefix[j] - prefix[i-1]
           • Then zeros = (substring length) - ones

           Example:
           s = 101101
           ones(1..4) = prefix[4] - prefix[0]

           This reduces time complexity from O(n³) → O(n²).
        -------------------------------------------------------------------- */

        result = 0;
        vector<int> prefix(n, 0);

        prefix[0] = (s[0] == '1');
        for (int i = 1; i < n; i++)
            prefix[i] = prefix[i - 1] + (s[i] == '1');

        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {

                int one = prefix[j] - (i > 0 ? prefix[i - 1] : 0);
                int zero = (j - i + 1) - one;

                if (zero * zero <= one)
                    result++;
            }
        }

        // return result;   // (Commented so Method 3 can run)
        ```

## Method 3: Jump Optimization (~On√n)


        /* --------------------------------------------------------------------
           METHOD 3: Optimized Jump Method — approx O(n √n)
           --------------------------------------------------------------------
           Goal:
           • Reduce the j-loop further by jumping over impossible ranges.
           • Use math to skip many j positions at once.

           Key Insight:
           Condition: zero² <= one

           For every (i, j), three cases occur:
           
           CASE 1: zero² > one → need more ones → jump  
           CASE 2: zero² == one → valid (count)  
           CASE 3: zero² < one → valid and can skip ahead  
        -------------------------------------------------------------------- */

        result = 0;
        vector<int> cumCountOne(n, 0);

        cumCountOne[0] = (s[0] == '1');
        for (int i = 1; i < n; i++)
            cumCountOne[i] = cumCountOne[i - 1] + (s[i] == '1');

        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {

                int countOne = cumCountOne[j] - (i > 0 ? cumCountOne[i - 1] : 0);
                int countZero = (j - i + 1) - countOne;

                // CASE 1: Need more ones → jump
                if (countZero * countZero > countOne) {
                    int need = (countZero * countZero) - countOne;
                    j += need - 1;
                }
                // CASE 2: Perfect balance
                else if (countZero * countZero == countOne) {
                    result++;
                }
                // CASE 3: Enough ones → jump ahead
                else {
                    result++;

                    int k = sqrt(countOne) - countZero;

                    if (j + k >= n) {
                        result += (n - j - 1);
                        break;
                    }
                    else {
                        result += k;
                        j += k;
                    }
                }
            }
        }

        return result;
    }
    ```
};

## Final Complexity Comparison

Method	Time Complexity	Status

Brute Force	O(n³)	❌ Too slow

Prefix Sum	O(n²)	✅ Good

Jump Method	~O(n √n)	🚀 Best
