## Index

1) [Problem Statement](#problem-statement)
2) [Approach](#approach)
3) [Code](#code)
4) [Dry Run](#dry-run)

## Problem Statement

Leetcode link: https://leetcode.com/problems/maximum-alternating-subsequence-sum/description/
You are given an array nums.

You need to find the maximum alternating sum of any subsequence of nums.

What is alternating sum?

The first chosen element is added

The second chosen element is subtracted

The third chosen element is added

And so on…

Note: After choosing a subsequence, its indices are reindexed starting from 0.

## Approach

**Things to focus in this question**

The question asks for a maximum sum of a subsequence → this strongly hints at Dynamic Programming

At every index, we have two choices:

Take the current element

Skip the current element

If we take an element:

Sometimes we add it

Sometimes we subtract it
→ so we must know what sign (+ or -) comes next

**Understanding "Reindexing" (Very Important)**

Example:

nums = [2, 3, 4, 5]


If we skip 2, the subsequence becomes:

[3, 4, 5]

Now:

3 becomes the first element → it is added

4 becomes the second → it is subtracted

So the sign depends on how many elements we have already taken,
not on the original index.

We need two things to define this DP:

i → current index in the array

plus → tells whether the current element should be:

1 → added

0 → subtracted

**Base Case**

If i goes beyond the array:

return 0

Choices at Every Index

At index i:

1) Take the element

If plus == 1 → add nums[i]

If plus == 0 → subtract nums[i]

After taking, the sign flips

take = nums[i] * (plus == 0 ? -1 : 1) + solve(i+1, !plus)

2) Skip the element

Sign does not change

skip = solve(i+1, plus)

Pick the best
max(take, skip)

**Recursive Code**

```cpp
class Solution {
public:

    long long solve(int i, vector<int>& nums, int plus) {
        if(i>=nums.size())
            return 0;
        // Main logic line 
        long long take = nums[i]*(plus==0?-1:1)+solve(i+1,nums,!plus);
        long long skip = solve(i+1,nums,plus);
        return max(take,skip);
    }

    long long maxAlternatingSum(vector<int>& nums) {
        int n=nums.size();
        return solve(0,nums,1);
    }
};
```

## Code

**Memoization**

1) Check how many variables are being converted in the main logic line, (i,plus)
Range of i from 0-->n-1, and plus will go from 0<-->1
Therefore 
vector<vector<long long>> dp(n,vector<long long>(2,-1))

2) Just add this below the base condition

if(dp[i][plus]!=-1)
    return -1;

3) return dp[i][plus]=max(take,skip)

```cpp
class Solution {
public:

    long long solve(int i, vector<int>& nums, vector<vector<long long>> &dp, int plus) {
        if(i>=nums.size())
            return 0;
        if(dp[i][plus]!=-1)
            return dp[i][plus];
        long long take = nums[i]*(plus==0?-1:1)+solve(i+1,nums,dp,!plus);
        long long skip = solve(i+1,nums,dp,plus);
        return dp[i][plus]=max(take,skip);
    }

    long long maxAlternatingSum(vector<int>& nums) {
        int n=nums.size();
        vector<vector<long long>> dp(n+1,vector<long long>(2,-1));
        return solve(0,nums,dp,1);
    }
};
```

**Tabulation**

For two changing variables
1) Apply loop for changing variables in the opossite direction, in memoization i was going from 0-->n, here it should go from n-1-->0, Likewise for plus 0-->1

2) By accessing the base condition we came to know that 
i>=n return 0, in dp:
dp[n][0]=0, dp[n][1]=0

3) Copy Main logic line as it is in the code just change solve to dp

```cpp
class Solution {
public:

    // long long solve(int i, vector<int>& nums, vector<vector<long long>> &dp, int plus) {
    //     if(i>=nums.size())
    //         return 0;
    //     if(dp[i][plus]!=-1)
    //         return dp[i][plus];
    //     long long take = nums[i]*(plus==0?-1:1)+solve(i+1,nums,dp,!plus);
    //     long long skip = solve(i+1,nums,dp,plus);
    //     return dp[i][plus]=max(take,skip);
    // }

    long long maxAlternatingSum(vector<int>& nums) {
        int n=nums.size();
        vector<vector<long long>> dp(n+1,vector<long long>(2,0));
        for(int i=n-1;i>=0;i--) {
            for(int plus=1;plus>=0;plus--) {
                long long take = nums[i]*(plus==0?-1:1)+dp[i+1][!plus];
                long long skip = dp[i+1][plus];
                dp[i][plus]=max(take,skip);
            }
        }
        return dp[0][1];
    }
};
```

## Dry Run

**Recursion**

solve(0, +)
│
├── TAKE 4 → +4 + solve(1, -)
│   │
│   ├── TAKE 2 → -2 + solve(2, +)
│   │   │
│   │   ├── TAKE 5 → +5 + solve(3, -)
│   │   │   │
│   │   │   ├── TAKE 3 → -3 + solve(4, +) = -3
│   │   │   └── SKIP 3 → solve(4, -) = 0
│   │   │       → max = 0
│   │   │
│   │   │   Total = 5
│   │   │
│   │   └── SKIP 5 → solve(3, +)
│   │       │
│   │       ├── TAKE 3 → +3 + solve(4, -) = 3
│   │       └── SKIP 3 → solve(4, +) = 0
│   │           → max = 3
│   │
│   │   Best from index 2 = max(5, 3) = 5
│   │   Total = -2 + 5 = 3
│   │
│   └── SKIP 2 → solve(2, -)
│       │
│       ├── TAKE 5 → -5 + solve(3, +)
│       │   → -5 + 3 = -2
│       └── SKIP 5 → solve(3, -) = 0
│           → max = 0
│
│   Best from index 1 = max(3, 0) = 3
│   Total = 4 + 3 = 7
│
└── SKIP 4 → solve(1, +)
    │
    ├── TAKE 2 → +2 + solve(2, -)
    │   → 2 + 0 = 2
    └── SKIP 2 → solve(2, +)
        → 5
