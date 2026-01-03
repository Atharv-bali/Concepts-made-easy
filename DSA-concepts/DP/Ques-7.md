## Problem Statement

Leetcode link: https://leetcode.com/problems/maximum-length-of-pair-chain/

You are given an array of pairs.
Each pair is of the form [a, b].

A pair p2 = [c, d] can come after pair p1 = [a, b] only if:

b < c

Your task is to find the maximum number of pairs that can be chained together.

## Approach

1) Why sorting is required

We are allowed to choose pairs in any order, but to build a valid chain, comparisons must be done correctly.

Example:

pairs = [[1,2], [7,8], [4,5]]

If we don’t sort, the chain length may come out wrong.
After sorting:

pairs = [[1,2], [4,5], [7,8]]

Now the chain can be:

[1,2] -> [4,5] -> [7,8]

Length = 3

So, sorting is mandatory.

2) Why Dynamic Programming (DP)?

The question asks for maximum length, which is a strong hint towards DP.

You might think of a greedy approach, but it fails in some cases.

Example where greedy fails:

pairs = [[1,6], [2,3], [4,5], [7,8], [10,11]]

Greedy result: 3

Correct answer: 4

So, greedy is not reliable here.

3) Relation with LIS (Longest Increasing Subsequence)

This problem is very similar to LIS, with a small modification.

In LIS:

nums[i] > nums[prev]

Here:

pairs[i][0] > pairs[prev][1]


So we can reuse the LIS tabulation pattern, but change the condition.

## Code

```cpp
class Solution {
public:
    int findLongestChain(vector<vector<int>>& pairs) {
        int n=pairs.size();
        sort(pairs.begin(),pairs.end());
        vector<vector<int>> dp(n+1,vector<int>(n+1,0));
        for(int i=n-1;i>=0;i--) {
            for(int prev=i-1;prev>=-1;prev--) {
                int take=0;
                // Condition given in question
                if(prev==-1 || pairs[i][0]>pairs[prev][1])
                    take=1+dp[i+1][i+1];
                int skip=dp[i+1][prev+1];
                dp[i][prev+1]=max(skip,take);
            }
        }
        return dp[0][0];
    }
};
```