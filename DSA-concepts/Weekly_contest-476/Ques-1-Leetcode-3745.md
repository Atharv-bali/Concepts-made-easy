#  How to Sort Information Using a C++ Function

##  Sorting in C++

To sort a vector in **ascending order**, we use the built-in `sort()` function:

```cpp
sort(nums.begin(), nums.end());
```

This arranges the elements from **smallest to largest**.

---

##  Approach

We want to maximize the expression:

```
a + b - c
```

To get the **maximum value**:

* `a` should be the **largest number**
* `b` should be the **second largest number**
* `c` should be the **smallest number**

Sorting helps us directly pick these values.

After sorting:

```
nums[0]     → smallest (c)
nums[n-2]   → second largest (b)
nums[n-1]   → largest (a)
```

So the answer becomes:

```
nums[n-1] + nums[n-2] - nums[0]
```

---

##  C++ Code

```cpp
class Solution {
public:
    int maximizeExpressionOfThree(vector<int>& nums) {
        /* Approach:
           If we want maximum value of a + b - c,
           a and b need to be maximum and c needs to be smallest.
        */
        sort(nums.begin(), nums.end());
        int n = nums.size();
        return nums[n-1] + nums[n-2] - nums[0];
    }
};
```
