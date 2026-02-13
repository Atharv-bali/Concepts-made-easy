## Index

1) [Introduction to cache](#introduction-to-cache)
2) [CAP theorem](#cap-theorem)

## Introduction to Cache

Instead of fetching the same data again and again from the database, we store it temporarily in Redis, which is much faster than a traditional database.

**Why is Cache Important?**

Without Cache:

If 10,000 users send the same request:

- The server goes to the SQL database every time.

- The database retrieves the same data again and again.

Since SQL databases are slower (disk-based), response time increases.

The database can become overloaded.

This reduces performance.

With Cache (Redis):

When a request comes:

- The server first checks Redis.

- If the data is found in Redis, it returns the data immediately.

- If not found, it fetches from SQL and stores it in Redis for future use.

Since Redis stores data in RAM, it is much faster than SQL.

So:

Faster responses

Less load on database

Better scalability

## CAP Theorem
What is a Distributed System?

A distributed system means:

A database can run on multiple servers.

Servers can be located in different cities or countries.

These servers communicate with each other over a network.

Since communication happens over a network, failures can occur.

**What Does CAP Theorem Say?**

In a distributed system, you can guarantee only 2 out of these 3 properties:

Consistency

Availability

Partition Tolerance (not Partial Tolerance)