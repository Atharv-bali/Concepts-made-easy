## Index
1) [Problem Statement](#problem-statement)
2) [Approach](#approach)
3) [Code](#code)
4) [Dry run](#dry-run)

## Problem Statement
Leetcode link: https://leetcode.com/problems/climbing-stairs/description/

You are standing at the 0ᵗʰ stair and want to reach the nᵗʰ stair.

At each step, you can:

climb 1 stair, or

climb 2 stairs

Your task is to find the total number of distinct ways to reach the top.

## Approach

Since the problem asks for the number of ways, and choices repeat for the same stair, this is a Dynamic Programming (DP) problem.

**Recursive Definition**

From stair i, you have two choices:

Jump to stair i + 1

Jump to stair i + 2

So:

f(i) = f(i + 1) + f(i + 2)

Base Conditions (Very Important)

1) If i > n
You crossed the last stair → this path is invalid

return 0


2) If i == n
You reached the destination → count this as one valid way

return 1

## Code

**Recursion**
```cpp
class Solution {
public:
    int solve(int i, int n, vector<int> &dp) {
        if(i>n)
            return 0;
        if(i==n)
            return 1;
        // main logic line
        return solve(i+1,n,dp)+solve(i+2,n,dp);
    }
    int climbStairs(int n) {
        return solve(0,n);
    }
};
```
**Time Complexity: O(2ⁿ)**
**Not suitable for large n**

**Memoization**
--> To convert recursion into memoizartion remember these steps:

Identify changing variable → i

Create a dp array of size n + 1

Before computing, check if already solved

Store the result before returning
```cpp
class Solution {
public:
    int solve(int i, int n, vector<int> &dp) {
        if(i>n)
            return 0;
        if(i==n)
            return 1;
        if(dp[i]!=-1)
            return dp[i];
        // main logic line
        return dp[i] = solve(i+1,n,dp)+solve(i+2,n,dp);
    }
    int climbStairs(int n) {
        vector<int> dp(n+1,-1);
        return solve(0,n,dp);
    }
};
```
**Time Complexity: O(n)**
**Space Complexity: O(n)**

**Bottom Up**

Understanding Base Cases in Bottom-Up

From recursion:

i > n → 0 → represented by dp[n + 1] = 0

i == n → 1 → represented by dp[n] = 1

Filling the DP Table

Recursive range: i = 0 → n

Bottom-up range: i = n - 1 → 0

Formula remains the same:

Write main logic line as it is just place dp instead of solve
dp[i] = dp[i + 1] + dp[i + 2]

```cpp
class Solution {
public:
    // int solve(int i, int n, vector<int> &dp) {
        // if(i>n)
        //     return 0;
        // if(i==n)
        //     return 1;
        // // main logic line
        // return solve(i+1,n,dp)+solve(i+2,n,dp);
    // }
    int climbStairs(int n) {
        vector<int> dp(n+2,0);
        dp[n+1]=0;
        dp[n]=1;
        for(int i=n-1;i>=0;i--) {
            dp[i]=dp[i+1]+dp[i+2];
        }
        return dp[0];
    }
};
```

## Dry Run

**Problem Recap**

You are at stair 0

You want to reach stair n

You can climb 1 or 2 steps at a time

We will do a dry run for:

n = 4

**Recursive formula:**

f(i) = f(i + 1) + f(i + 2)

**Base Conditions**

If i > n  → return 0   (invalid path)
If i == n → return 1   (one valid way)

Recursion Tree Dry Run (n = 4)
                        f(0)
                     /        \
                 f(1)          f(2)
               /     \        /     \
           f(2)      f(3)   f(3)    f(4)
          /    \     /   \    |
      f(3)   f(4)  f(4) f(5) f(5)
        |      |     |     |
      f(4)   1     1     0
        |
        1

Evaluating Base Cases

f(4) = 1   (reached destination)
f(5) = 0   (crossed destination)

Bottom-Up Value Calculation

Now values start returning upward:

f(3) = f(4) + f(5) = 1 + 0 = 1
f(2) = f(3) + f(4) = 1 + 1 = 2
f(1) = f(2) + f(3) = 2 + 1 = 3
f(0) = f(1) + f(2) = 3 + 2 = 5

Final Answer
Number of ways to climb 4 stairs = 5