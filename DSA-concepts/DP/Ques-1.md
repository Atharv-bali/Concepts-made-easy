## Index
1) [Problem Statement](#problem-statement)
2) [Approach](#approach)
3) [Code](#code)
4) [Dry run](#dry-run)

## Problem Statement
Leetcode link: https://leetcode.com/problems/fibonacci-number/
You are given an integer n.
Your task is to return the nᵗʰ Fibonacci number.

What is Fibonacci?
The Fibonacci sequence is defined as:
Each number is the sum of the previous two numbers
The sequence starts with:
0, 1, 1, 2, 3, 5, 8, ...

---

## Approach

Mathematical Definition
f(n) = f(n-1) + f(n-2)

Example (n = 5)
f(5) = f(4) + f(3)
f(4) = f(3) + f(2)

Here, you can clearly see overlapping subproblems:

f(3) is calculated multiple times

This makes the problem a classic Dynamic Programming (DP) problem.

**Base condition**
If n == 0 or n == 1 → return n

## Code 
**Recursion**

This is the most straightforward solution but inefficient due to repeated calculations.

```cpp
class Solution {
public:
    int fib(int n) {
        if(n<=1)
            return n;
        // main logic line
        return fib(n-1)+fib(n-2);
    }
};
```
**Time Complexity: O(2ⁿ)**
**Not recommended for large n**

**Memoization**
--> Steps to convert recursion → memoization:

1) Identify changing variable → n

2) Create a dp array of size n + 1

3) Before computing, check if value already exists

4) Store the result before returning

```cpp
class Solution {
public:
    int solve(int n, vector<int> &dp) {
        if(n<=1)
            return n;
        if(dp[n]!=-1)
            return dp[n];
        // main logic line
        return dp[n] = fib(n-1)+fib(n-2);
    }
    int fib(int n) {
        vector<int> dp(n+1,-1);
        return solve(n,dp);
    }
};
```
**Time Complexity: O(n)**
**Space Complexity: O(n) (recursion + dp array)**

**Bottom-Up**
--> Steps to convert memoization → bottom-up:

1) Write base cases directly in dp array

dp[0] = 0
dp[1] = 1

2) Loop from 2 to n

3) Use the main logic line inside the loop

4) Return dp[n]

```cpp
class Solution {
public:
    // int solve(int n, vector<int> &dp) {
    //     if(n<=1)
    //         return n;
    //     if(dp[n]!=-1)
    //         return dp[n];
            //main logic line
    //     return dp[n] = fib(n-1)+fib(n-2);
    // }
    int fib(int n) {
        if(n<=1)
            return n;
        vector<int> dp(n+1,0);
        dp[0]=0;
        dp[1]=1;
        for(int i=2;i<=n;i++)
            dp[i]=dp[i-1]+dp[i-2];
        return dp[n];
    }
};
```

## Dry Run 
We start with:

fib(5)

Level 1
fib(5)
= fib(4) + fib(3)

Level 2
fib(4) = fib(3) + fib(2)
fib(3) = fib(2) + fib(1)


So now:

fib(5)
= (fib(3) + fib(2)) + (fib(2) + fib(1))

Level 3

Expand further:

fib(3) = fib(2) + fib(1)
fib(2) = fib(1) + fib(0)


Now the full expression becomes:

fib(5)
= ((fib(2) + fib(1)) + (fib(1) + fib(0)))
  + ((fib(1) + fib(0)) + fib(1))

--> Base Case Evaluation

Now we start returning values:

fib(1) = 1
fib(0) = 0

Bottom-Up Value Calculation
fib(2) = fib(1) + fib(0) = 1 + 0 = 1
fib(3) = fib(2) + fib(1) = 1 + 1 = 2
fib(4) = fib(3) + fib(2) = 2 + 1 = 3
fib(5) = fib(4) + fib(3) = 3 + 2 = 5

```
Recursion Tree (Visual)
                fib(5)
              /        \
          fib(4)       fib(3)
         /      \      /      \
     fib(3)   fib(2) fib(2)  fib(1)
     /    \     /  \    /  \
 fib(2) fib(1) f(1) f(0) f(1) f(0)
```