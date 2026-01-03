## Index

1) [Problem Statement](#problem-statement)
2) [Approach](#approach)
3) [Code](#code)

## Problem Statement

Leetcode link: http://leetcode.com/problems/longest-increasing-subsequence/description/

You are given an integer array nums.

Your task is to find the length of the Longest Increasing Subsequence (LIS).

A subsequence:

- Does not need to be continuous

- Maintains the original order

## Approach

Keywords like “longest” and “subsequence” strongly indicate a Dynamic Programming (DP) problem.

At every index, you have two choices:

- Take the current element (if it forms an increasing sequence)

- Skip the current element

**Recursive Thinking**

We define a recursive function:

solve(i, prev)

Where:

- i → current index

- prev → index of the previously taken element
(-1 means no element has been taken yet)

Choices at index i

1) Take the element

You can take nums[i] only if:

prev == -1 (first element), or

nums[i] > nums[prev]

If taken:

take = 1 + solve(i + 1, i)

2) Skip the element
skip = solve(i + 1, prev)

Final Answer at this state

max(take, skip)

**Base Case**

If i goes out of bounds:

return 0

**Recursion Approach**

```cpp
class Solution {
public:
    int solve(int i, int prev, vector<int> &nums) {
        if(i>=nums.size())
            return 0;
        int take=0;
        if(prev==-1 || nums[i]>nums[prev]) {
            take=1+solve(i+1,i,nums);
        }
        int skip=solve(i+1,prev,nums);
        return max(skip,take);
    }
    int lengthOfLIS(vector<int>& nums) {
        //initial index = 0, previous index = -1
        return solve(0,-1,nums);
    }
};
```

Problem with Negative Index

prev can be -1

Arrays cannot have negative indices

**Solution**

Shift prev by +1 while storing in DP

So:

prev = -1 → stored as 0

prev = 0 → stored as 1, etc.

## Code

**Memoization**

```cpp
class Solution {
public:
    int solve(int i, int prev, vector<int> &nums, vector<vector<int>> &dp) {
        if(i>=nums.size())
            return 0;
        if(dp[i][prev+1]!=-1)
            return dp[i][prev+1];
        int take=0;
        // use of prev, don't increment because it is not of dp but of normal array
        if(prev==-1 || nums[i]>nums[prev]) {
            // increment to avoid negative index
            take=1+solve(i+1,i,nums,dp);
        }
        //increment to avoid negative index
        int skip=solve(i+1,prev,nums,dp);
        // return +1 as shifting of index has taken place
        return dp[i][prev+1] = max(skip,take);
    }
    int lengthOfLIS(vector<int>& nums) {
        int n = nums.size();
        vector<vector<int>> dp(n,vector<int>(n,-1));
        return solve(0,-1,nums,dp);
    }
};
```

**Tabulation**

```cpp
class Solution {
public:
    // int solve(int i, int prev, vector<int> &nums, vector<vector<int>> &dp) {
    //     if(i>=nums.size())
    //         return 0;
    //     if(dp[i][prev+1]!=-1)
    //         return dp[i][prev+1];
    //     int take=0;
    //     // use of prev, don't increment because it is not of dp but of normal array
    //     if(prev==-1 || nums[i]>nums[prev]) {
    //         take=1+solve(i+1,i,nums,dp);
    //     }
    //     int skip=solve(i+1,prev,nums,dp);
    //     // return +1 as shifting of index has taken place
    //     return dp[i][prev+1] = max(skip,take);
    // }
    int lengthOfLIS(vector<int>& nums) {
        int n = nums.size();
        // vector<vector<int>> dp(n,vector<int>(n,-1));
        vector<vector<int>> dp(n+1,vector<int>(n+1,0));
        for(int i=n-1;i>=0;i--) {
            for(int prev=i-1;prev>=-1;prev--) {
                int take=0;
                if(prev==-1 || nums[i]>nums[prev]) {
                    take=1+dp[i+1][i+1];
                }
                int skip=dp[i+1][prev+1];
                dp[i][prev+1]=max(skip,take);
            }
        }
        return dp[0][0];
    }
};
```

**Do learn tabulation so that you can directly solve the LIS problem.**