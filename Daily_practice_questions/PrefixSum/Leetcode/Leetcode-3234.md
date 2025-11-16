## 📘 Table of Contents
- [Method 1: Brute Force (O(n³))](#method-1-pure-brute-force--on³)
- [Method 2: Prefix Sum Optimization (O(n²))](#method-2-using-prefix-sum--on²)
- [Method 3: Jump Optimization (~O(n-√n))](#method-3-optimized-jump-method--approx-on-√n)
- [Final Complexity Comparison](#📌-final-complexity-comparison)
- [Summary](#🎉-summary)
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

           This method helps us understand the problem but will Exceed the Time Limit .
        -------------------------------------------------------------------- */

        int n = s.size(), result = 0;
        for (int i = 0; i < n; i++) {         // O(n)
            for (int j = i; j < n; j++) {     // O(n)
                int zero = 0, one = 0;

                for (int k = i; k <= j; k++) {   // O(n)
                    if (s[k] == '0') zero++;
                    else one++;
                }

                if (zero * zero <= one)
                    result++;
            }
        }

        // return result;   // (Commented so Method 2 can execute below)



        /* --------------------------------------------------------------------
           METHOD 2: Using Prefix Sum  — O(n²)
           --------------------------------------------------------------------
           Why do we use prefix sum?
           • Inside every substring s[i..j], counting ones repeatedly is expensive.
           • Prefix sum lets us find number of ones in O(1):
                 ones(i..j) = prefix[j] - prefix[i-1]
           • Then zeros = (substring length) - ones.

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

        for (int i = 0; i < n; i++) {          // O(n)
            for (int j = i; j < n; j++) {      // O(n)

                int one = prefix[j] - (i > 0 ? prefix[i - 1] : 0);
                int zero = (j - i + 1) - one;

                if (zero * zero <= one)
                    result++;
            }
        }

        // return result;   // (Commented so Method 3 can run)



        /* --------------------------------------------------------------------
           METHOD 3: Optimized Jump Method — approx O(n √n)
           --------------------------------------------------------------------
           Goal:
           • Reduce the j-loop further by “jumping” over impossible ranges.
           • Use math to skip many j positions at once.

           Key Insight:
           Condition is:
                zero² <= one

           For each (i, j), three cases occur:

           CASE 1: zero² > one    → Not enough ones
           -------------------------------------------------
           We need more 1s to ever satisfy the condition.
           Required additional ones = (zero² - one)

           So we jump:
                j += (zero² - one) - 1

           Example:
                substring = 00011
                zeros = 3 → zero² = 9
                ones = 0
                Need 9 more ones → jump ahead 9 steps.


           CASE 2: zero² == one   → Exactly valid
           -------------------------------------------------
           The substring is valid.
           But we cannot jump, because even one step may break balance.
           So simply:
                result++


           CASE 3: zero² < one    → Already valid
           -------------------------------------------------
           We have enough ones, and future substrings might also be valid.

           Let targetZero = floor(sqrt(one))
           Additional zeros needed = targetZero - currentZero

           So:
                k = sqrt(one) - countZero

           Meaning: We can skip k future j's immediately.

           But if j + k goes out of bounds:
                we add all remaining valid substrings at once.


           This technique avoids checking every j and reduces complexity
           to roughly O(n √n).
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

                // CASE 1: zero² > one → Need more ones → jump
                if (countZero * countZero > countOne) {
                    int need = (countZero * countZero) - countOne;
                    j += need - 1;
                }

                // CASE 2: zero² == one → valid, cannot jump
                else if (countZero * countZero == countOne) {
                    result++;
                }

                // CASE 3: zero² < one → valid and can jump forward
                else {
                    result++;

                    int k = sqrt(countOne) - countZero;  // how far can we jump?

                    // If the jump goes out of array
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
};
