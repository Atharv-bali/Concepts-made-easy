## Problem Statement

Leetcode link: https://leetcode.com/problems/longest-string-chain/

You are given a list of words.

A word A can come before word B in a chain if:

B can be formed by inserting exactly one character into A

The order of existing characters must remain the same

Your task is to find the length of the longest possible word chain.

## Approach

1) Sort the words by length

We must process shorter words first, because a longer word can only be formed from a shorter one.

sort(words.begin(), words.end(), comp);


Example:

["a", "b", "ba", "bca", "bda", "bdca"]

2) Define the matching condition

We write a helper function find_match(s1, s2) that returns true if:

s1 is exactly one character longer than s2

Removing one character from s1 makes it equal to s2

This checks whether s2 → s1 is a valid chain step.

3) Apply LIS-style Dynamic Programming

## Code

```cpp
class Solution {
public:
    static bool comp(const string& w1, const string& w2) {
        return w1.size()<w2.size();
    }
    bool find_match(string s1, string s2) {
        if(s2.size()+1 != s1.size())
            return false;
        int n=s1.size(),m=s2.size(),i=0,diff=0,j=0;
        while(i<n && j<m) {
            if(s1[i]!=s2[j]) {
                diff++;
                i++;
                continue;
            }
            i++;
            j++;
        }
        if(diff>1)
            return false;
        else
            return true;
    }
    int longestStrChain(vector<string>& words) {
        // sort to take maximum length
        sort(words.begin(),words.end(),comp);
        int n=words.size();
        vector<vector<int>> dp(n+1,vector<int>(n+1,0));
        for(int i=n-1;i>=0;i--) {
            for(int prev=i-1;prev>=-1;prev--) {
                int take=0;
                // Condition in question
                if(prev==-1 || find_match(words[i],words[prev]))
                    take=1+dp[i+1][i+1];
                int skip=dp[i+1][prev+1];
                dp[i][prev+1]=max(skip,take);
            }
        }
        return dp[0][0];
    }
};
```