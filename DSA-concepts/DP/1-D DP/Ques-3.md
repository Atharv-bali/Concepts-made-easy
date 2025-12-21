## Index
1) [Problem Statement](#problem-statement)
2) [Approach](#approach)
3) [Code](#code)
4) [Dry Run](#dry-run)

## Problem Statement

Leetcode Link: https://leetcode.com/problems/house-robber/
You are given an array nums where:

Each element represents the amount of money in a house.

Houses are in a straight line.

Rule:
You cannot rob two adjacent houses (because of the security system).

Goal

Find the maximum amount of money you can rob without robbing two neighboring houses.

---

## Approach

The phrase "maximum amount of money" strongly indicates that we should use
Dynamic Programming (DP).

Recursive Thinking

Base Case

If we move beyond the last house:

if (i >= nums.size())
    return 0;

This means:

No houses left to rob

No money can be collected

Choices at Each House

At every house i, we have two options:

1) Rob the current house

Take nums[i]

Skip the next house

Move to i + 2

2) Skip the current house

Do not take any money

Move to i + 1

Recurrence Relation

We choose the option that gives more money:

```cpp
solve(i) = max(
    nums[i] + solve(i + 2),   // take the house
    solve(i + 1)              // skip the house
)
```

---

## Code

**Memoization**
```cpp
class Solution {
public:

    int solve(int i, vector<int> &nums, vector<int> &dp) {
        if(i>=nums.size())
            return 0;
        if(dp[i]!=-1)
            return dp[i];
        int take = nums[i]+solve(i+2,nums,dp);
        int skip = solve(i+1,nums,dp);
        return dp[i]=max(take,skip);
    }

    int rob(vector<int>& nums) {
        int n = nums.size();
        vector<int> dp(n,-1);
        return solve(0,nums,dp);
    }
};
```
**Buttom-up**(Derive it using same technique as done in previous questions)
```cpp
class Solution {
public:

    // int solve(int i, vector<int> &nums, vector<int> &dp) {
    //     if(i>=nums.size())
    //         return 0;
    //     if(dp[i]!=-1)
    //         return dp[i];
    //     int take = nums[i]+solve(i+2,nums,dp);
    //     int skip = solve(i+1,nums,dp);
    //     return dp[i]=max(take,skip);
    // }

    int rob(vector<int>& nums) {
        int n = nums.size();
        vector<int> dp(n+2,0);
        for(int i=n-1;i>=0;i--) {
            int take = nums[i]+dp[i+2];
            int skip = dp[i+1];
            dp[i]=max(take,skip);
        }
        return dp[0];
    }
};
```

---

## Dry Run
Example: nums = [2, 3, 2]
index:  0  1  2

solve(0)
├── take house 0 → 2 + solve(2)
│   ├── solve(2)
│   │   ├── take house 2 → 2 + solve(4)
│   │   │   └── solve(4) = 0   (out of bounds)
│   │   ├── skip house 2 → solve(3)
│   │   │   └── solve(3) = 0   (out of bounds)
│   │   └── solve(2) = max(2, 0) = 2
│
├── skip house 0 → solve(1)
│   ├── solve(1)
│   │   ├── take house 1 → 3 + solve(3)
│   │   │   └── solve(3) = 0   (out of bounds)
│   │   ├── skip house 1 → solve(2)
│   │   │   └── solve(2) = 2   (from dp)
│   │   └── solve(1) = max(3, 2) = 3
│
└── solve(0) = max(2 + 2, 3) = 4

---