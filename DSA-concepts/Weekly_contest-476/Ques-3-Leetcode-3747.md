#  Count Distinct Numbers Without Zero

## 📌 Probability Basics

If we can fill digits only using numbers **1 to 9**, then:

```
_ _ _
```

Each blank has **9** possible values.

So the total combinations are:

```
9 × 9 × 9 = 729
```

---

## 📌 Approach

We can only use digits from **1 to 9** (no zero allowed).

Take an example of a **3-digit number**, i.e. **423**.

We want the number of valid numbers **from 1 to 423** that do **not** contain zero.

---

### ✅ Step 1: Count 1-digit and 2-digit valid numbers

```
_     → 9 options  
_ _   → 9 × 9 = 81 options  
```

So total:

```
9 + 81 = 90 unique numbers
```

---

### ✅ Step 2: Count valid 3-digit numbers

Since the first digit of 423 is **4**, all numbers of the form:

```
1 _ _
2 _ _
3 _ _
```

are valid.

Each has:

```
9 × 9 = 81 combinations
```

So we add:

```
81 + 81 + 81 = 243
```

Total so far:

```
90 + 243 = 333
```

This covers all valid numbers from **100 to 399**.

---

### ✅ Step 3: Handle numbers starting with 4

Now look at `4 _ _`.
The second digit of 423 is **2**.

Possible second digits `< 2` → only:

```
1
```

For `41_`, the last digit has:

```
9 options (1 to 9)
```

So add:

```
1 × 9 = 9
```

Total becomes:

```
333 + 9 = 342
```

This covers valid numbers up to **419**.

---

### ✅ Step 4: Handle `4 2 _`

Now we have:

```
4 2 _
```

Possible last digits before 3:

```
1, 2, 3 → 3 options
```

So add:

```
342 + 3 = 345
```

---

## 🧾 C++ Code

```cpp
class Solution {
public:
    long long countDistinct(long long n) {
        string x = to_string(n);
        int size = x.size();
        long long total = 0;
        long long power = 9;

        // If number is of 3 digits find all unique numbers till 2 digits
        for(int i = 1; i < size; i++) {
            total += power;
            power *= 9;
        }

        for(int i = 0; i < size; i++) {
            int digit = x[i] - '0';

            // For every smaller starting digit
            for(int d = 1; d < digit; d++) {
                int rem = size - i - 1;
                total += pow(9, rem);
            }

            if(digit == 0) break;
            if(i == size - 1) total += 1;
        }

        return total;
    }
};
```
