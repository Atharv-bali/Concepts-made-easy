## Index

1) [Introduction](#introduction)
2) [Client-server model](#client-server-model)
3) [Types of server](#types-of-server)
4) [Load Balancing](#load-balancing)

## Introduction:

System design means designing a system in such a way that it can handle failures, trade-offs, scaling, and real-world issues.

In simple words:

- DSA solves algorithmic problems.

- System design solves problems that happen during real-life implementation.

Some real-world problems are:

- 10 million users using the system at the same time

- Network failures

- High latency

- Server crashes

- Data consistency issues

Now let’s understand some basic concepts.

## Client-Server model:

A client is a normal user like us who uses an application.

For example, if a user wants to log in:

The user enters their username and password.

The browser sends a request to the server.

The server checks the database.

The server sends back a response like “Login Successful” or “Invalid Credentials”.

Analogy:

Think of a restaurant:

Client → Customer

Server → Waiter

Backend/Database → Kitchen

A customer (client) orders food from the waiter (server).
The waiter tells the kitchen staff (database/backend).
The kitchen prepares the food and gives it to the waiter.
The waiter brings the food back to the customer.

## Types of server 

1) Stateless server: 
A stateless server does not store previous information about a user.
It treats every request as a completely new request.

Example:
If you refresh a page and the server does not remember who you are unless you send a token or cookie, it is stateless.

Advantages:

- Easier to scale

- We can add more servers easily

- We can use a load balancer

- If one server crashes, another server can handle the request

This is generally used in horizontal scaling (adding more servers).

2) Stateful server: 
A stateful server stores user information between requests.

Example:
In shopping apps, if you add items to your cart and come back after one week, your cart is still there.

Disadvantages:

Load balancing becomes difficult

Needs sticky sessions (user must connect to the same server)

If one server crashes, user data stored in that server may be lost

Because of this, stateful systems are harder to scale compared to stateless systems.

## Load Balancing

If 10,000 users logins to your new app, server will say

"Bhai thak gaya main"

So we add more servers, but which server handles which request this is the job of load balancing.

Users ---> Load balancer ---> server

**Vertical Scaling**

Incresing the power of server, in order to increase the number of requests processed by server.

Advantages: 

- Easy to implement
- No architectural change

Disadvantages:

- Expensive
- Hardware limit
- Server crashes, everything goes down

**Horizontal Scaling**

Increasing the number of server, in order to increase the number of requests processed by server.

Advantages:

- More scalable
- More fault tolerant
- Industry standard

It is better than vertical scaling.

**Round Robin**

Very simple.

Requests go like this:
```
User1 --> Server1

User2 --> Server2

User3 --> Server1

User4 --> Server2
```
**Advantages**

- Simple
- Easy to implement
- Equal distribution

**Disadvantages**

- Doesn't check wheather the system is overloaded, down or slow. 

**Least connections**

Checks which server has less active users.

For example: 

Server 1 --> 100 users
Server 2 --> 20 users

New connection goes to server 2.

Advantages

- More efficient
- Better resource usage

Disadvantages

- Very complex