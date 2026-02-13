## Introduction to Cache
Instead of bringing the content again and again fromn the database, it is stored in a redis which is faster than the database.

**Why is it important**
Without cache:
Even if 10,000 same requests comes to the server, the server will take request to SQL, then retrieve the data everytime. SQL being slow, takes more time.

With cache(redis):
Server first request the server, the server directly goes to redis who serve requests very quickly.

## CAP theorem:

A distributed system means:
- A database, can run on many servers
- A server can be located in different locations
- The servers communicate over a network

This theorem says that the distributed system can guarantee only 2 out of 3
- Consistency
- Availability
- Partial Tolerance

