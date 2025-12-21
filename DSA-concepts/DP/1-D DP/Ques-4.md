## Index
1) [Problem Statement](#problem-statement)
2) [Approach](#approach)
3) [Code](#code)
4) [Dry Run](#dry-run)

## Problem Statement

Leetcode Link: https://leetcode.com/problems/house-robber-ii/description/

You are given an array nums where each element represents the money in a house.
The houses are arranged in a circular manner.

Rule:

You cannot rob two adjacent houses.

Since the houses are circular, the first and last house are also adjacent.

Your task is to find the maximum amount of money you can rob without breaking the rule.

---

## Approach

In House Robber I, houses are in a straight line.
In House Robber II, houses are in a circle, which creates one extra restriction:

If you rob the first house, you cannot rob the last house

If you rob the last house, you cannot rob the first house

**Key Idea**

We break the circular problem into two linear problems:

Consider houses from index 0 to n-2
-> First house included, last house excluded

Consider houses from index 1 to n-1
-> First house excluded, last house included

Then take the maximum of both results.

answer = max(
    solve(0, n-1),   // include first house
    solve(1, n)      // include last house
)


This converts the circular problem into two normal House Robber problems.

---

## Code

**Memoization**
```cpp
class Solution {
public:
    int solve(int i, int n, vector<int>& nums, vector<int> &dp) {
        if(i>=n)
            return 0;
        if(dp[i]!=-1)
            return dp[i];
        int take = nums[i]+solve(i+2,n,nums,dp);
        int skip = solve(i+1,n,nums,dp);
        return dp[i]=max(take,skip);
    }
    int rob(vector<int>& nums) {
        int n = nums.size();
        if(n==1)
            return nums[0];
        vector<int> dp1(n+1,-1);
        vector<int> dp2(n+1,-1);
        return max(solve(0,n-1,nums,dp1),solve(1,n,nums,dp2));
    }
};
```

**Bottom-up**

For conversion from bottom up-memoization refer Ques-2.md
```cpp
class Solution {
public:
    // int solve(int i, int n, vector<int>& nums, vector<int> &dp) {
    //     if(i>=n)
    //         return 0;
    //     if(dp[i]!=-1)
    //         return dp[i];
    //     int take = nums[i]+solve(i+2,n,nums,dp);
    //     int skip = solve(i+1,n,nums,dp);
    //     return dp[i]=max(take,skip);
    // }
    int rob(vector<int>& nums) {
        int n = nums.size();
        if(n==1)
            return nums[0];
        vector<int> dp(n+2,0);
        dp[n-1]=0;
        dp[n]=0;
        for(int i=n-2;i>=0;i--) {
            int take = nums[i]+dp[i+2];
            int skip = dp[i+1];
            dp[i]=max(take,skip);
        }
        int result1=dp[0];
        dp.clear();
        dp[n+1]=0;
        dp[n]=0;
        for(int i=n-1;i>=1;i--) {
            int take = nums[i]+dp[i+2];
            int skip = dp[i+1];
            dp[i]=max(take,skip);
        }
        int result2=dp[1];
        return max(result1,result2);
    }
};
```

---

## Dry run

Dry run is same as House Robber I, just applied twice with different ranges.
(You can refer to Ques-2.md as mentioned.)

---