#  Minimum Length After Removals — Prefix Sum Intuition (C++)

This repository explains how to solve the **"Minimum Length After Removals"** problem using a simple and clean **Prefix Sum** approach.

If you're new to Prefix Sum, check the detailed explanation here:
🔗 [https://github.com/Atharv-bali/Concepts-made-easy/tree/main/Daily_practice_questions/PrefixSum](https://github.com/Atharv-bali/Concepts-made-easy/tree/main/Daily_practice_questions/PrefixSum)

---

##  Problem Summary

You are given a string `s` consisting only of:

* `'a'`
* `'b'`

You are allowed to remove **equal numbers of `'a'` and `'b'`** from the string.

Your task: return the **minimum length** of the string after such removals.

---

##  Intuition

The minimum possible leftover is:

```
| count(a) − count(b) |
```

Why?

* You can only remove characters in **balanced `'a'`–`'b'` pairs**.
* Extra `'a'` or extra `'b'` cannot be paired.
* So the leftover is simply the **absolute difference** between their frequencies.

---

##  Why Prefix Sum?

Prefix Sum helps efficiently count how many `'a'` characters appear.

* `prefixSum[i]` → number of `'a'` from index `0` to `i`
* `prefixSum[n-1]` → total `'a'`
* Total `'b'` = `n - total(a)`

Final answer:

```
abs(total(a) − total(b))
```

---

##  C++ Code (Clean & Readable)

```cpp
class Solution {
public:
    int minLengthAfterRemovals(string s) {
        int n = s.size();

        // PrefixSum[i] = number of 'a' from index 0 to i
        vector<int> prefixSum(n, 0);

        // Initialize prefix sum
        prefixSum[0] = (s[0] == 'a') ? 1 : 0;

        // Build prefix sum array
        for (int i = 1; i < n; i++) {
            prefixSum[i] = prefixSum[i - 1] + (s[i] == 'a' ? 1 : 0);
        }

        // Total 'a'
        int totalA = prefixSum[n - 1];

        // Total 'b'
        int totalB = n - totalA;

        // Minimum leftover after removing equal pairs
        return abs(totalA - totalB);
    }
};
```
