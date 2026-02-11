#  Prefix Sum — A Beginner-Friendly Guide

##  Table of Contents
- [Introduction](#introduction)
- [What is Prefix Sum?](#what-is-prefix-sum)
- [Case 1: Calculating Sum of Queries](#case-1-calculating-sum-of-queries-from-l-to-r)
- [Case 2: Counting Occurrences](#case-2-counting-occurrences-in-a-binary-array)
- [When NOT to Use Prefix Sum](#when-not-to-use-prefix-sum)
- [Common Errors](#common-errors)

---

## Introduction

A **prefix sum** (also called cumulative sum) is a powerful technique to answer range queries efficiently.  
Instead of looping every time to calculate a sum, we precompute a prefix array once and then answer each query in **O(1)**.

Prefix Sum is useful for:
- Range sum queries  
- Counting occurrences in a binary array  

---

## What is Prefix Sum?

Given an array:

nums = [1,2,3,4,5,6,7,8]

We build the prefix array:

prefix = [1,3,6,10,15,21,28,36]

Where:

prefix[i] = nums[0] + nums[1] + ... + nums[i]

This converts repeated **O(n)** calculations into **O(1)** lookups.

---

## Case 1: Calculating Sum of Queries from l to r

Example:

nums = [1,2,3,4,5,6,7,8]

If we want:
- nums[4..6]
- nums[3..7]

We use the prefix sum formula instead of looping every time.

### Code (C++)

```cpp
int arr[] = {1,2,3,4,5,6,7,8};
int n = sizeof(arr)/sizeof(arr[0]);

vector<int> prefixSum(n, 0);
prefixSum[0] = arr[0];

for(int i = 1; i < n; i++) {
    prefixSum[i] = prefixSum[i-1] + arr[i];
}
// prefixSum = [1,3,6,10,15,21,28,36]

// To find sum(l..r):
int l = 4, r = 6;
int result = prefixSum[r] - prefixSum[l-1];
```

---

## Case 2: Counting Occurrences in a Binary Array

Prefix Sum can count how many times a value appears in a range.

Example:

nums = [0,1,1,1,0,1,0]

We want to count **how many 1s** appear between index 2 and 6.

Build a prefix count of 1s:

prefix = [0,1,2,3,3,4,4]

Formula:

count(2..6) = prefix[6] - prefix[1]

### Code (C++)

```cpp
int nums[] = {0,1,1,1,0,1,0};
int n = sizeof(nums)/sizeof(nums[0]);

vector<int> prefix(n, 0);
prefix[0] = nums[0];

for(int i = 1; i < n; i++) {
    prefix[i] = prefix[i-1] + nums[i];
}

// Count of 1s from index 2 to 6
int result = prefix[6] - prefix[1];
```

---

## When NOT to Use Prefix Sum

Avoid prefix sums when:
- The array changes frequently  
- You need both updates + fast queries  

Use instead:
- Segment Tree  
- Fenwick Tree (Binary Indexed Tree)

---

## Common Errors

### Error: When l = 0  
prefix[l-1] becomes prefix[-1], which is invalid.

### Correct Solution

If l == 0:

sum(0..r) = prefix[r]

Else:

sum(l..r) = prefix[r] - prefix[l-1]

Example:

```cpp
if(l == 0)
    result = prefix[r];
else
    result = prefix[r] - prefix[l - 1];
```

---

Prefix Sum is simple, powerful, and widely used in coding interviews, DSA, and LeetCode.
