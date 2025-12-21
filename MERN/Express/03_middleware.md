## Index
1) [Middleware](#middleware)
2) [Why Middleware](#why-middleware)
3) [Middleware sending a response](#middleware-sending-a-response-not-recommended)
4) [Middleware as a logger](#middleware-as-a-logger)
5) [Writing logs to a file](#writing-logs-to-a-file)
6) [Adding data to request object](#adding-data-to-request-object-req)
7) [Key Points to remember](#key-points-to-remember)
8) [Documentation](#official-documentation-must-read)

---

## Middleware

What is Middleware?
Middleware is a function that runs between the request and the response.

Flow:

Client Request → Middleware → Route (endpoint) → Response

Middleware can read, modify, or stop a request before it reaches an endpoint.

Middleware can also send a response itself.

If a middleware sends a response, the endpoint will not run.

---

## Why middleware

Middleware is useful when you want to:

--> Check the type of request (GET, POST, etc.)

--> Log request time, URL, or method

--> Add extra data to the request
 
--> Authenticate users
 
--> Validate inputs
 
Basic Middleware Example: 

```Javascript
const express = require('express')
const app = express()
const port = 3000

//Middleware 1

app.use((req, res, next) => {
    console.log('m1')
    next()
})

//Middleware 2

app.use((req, res, next) => {
    console.log('m2')
    next()
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/about', (req, res) => {
    res.send('About page')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
```
Output in console (for any endpoint):

m1
m2

---

## Middleware Sending a Response (Not Recommended)

Middleware can send a response, but this is usually not a good practice.

Why?

All routes will show the same response

next() becomes meaningless

Endpoints will never execute

Example (Bad Practice)

```Javascript
const express = require('express')
const app = express()
const port = 3000

//Middleware 1

app.use((req, res, next) => {
    console.log('m1')
    // I can also send a response here and not call next()
    res.send('Response from middleware 1')
    next()
})

//Middleware 2

app.use((req, res, next) => {
    console.log('m2')
    next()
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/about', (req, res) => {
    res.send('About page')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

```

---

## Middleware as a Logger

Middleware is commonly used for logging requests.

```Javascript

const express = require('express')
const app = express()
const port = 3000

//Middleware 1

app.use((req, res, next) => {
    console.log('m1')
    // I can also send a response here and not call next()
    console.log(`Request URL: ${req.url}, Date: ${Date.now()}, request method: ${req.method}`)
    next()
})

//Middleware 2

app.use((req, res, next) => {
    console.log('m2')
    next()
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/about', (req, res) => {
    res.send('About page')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

```

This will be shown in console
m1
Request URL: /, Date: 1766231086775, request method: GET
m2

---

## Writing Logs to a File

Instead of printing logs in the console, we can store them in a file.

Example code:

```Javascript
const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')

//Middleware 1

app.use((req, res, next) => {
    console.log('m1')
    // I can also send a response here and not call next()
    // console.log(`Request URL: ${req.url}, Date: ${Date.now()}, request method: ${req.method}`)
    fs.appendFileSync("logs.txt", `Request URL: ${req.url}, Date: ${Date.now()}, request method: ${req.method}\n`)
    next()
})

//Middleware 2

app.use((req, res, next) => {
    console.log('m2')
    next()
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/about', (req, res) => {
    res.send('About page')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

```

logs.txt will be made having content something like this

Request URL: /, Date: 1766232458019, request method: GET
Request URL: /about, Date: 1766232464682, request method: GET
Request URL: /about, Date: 1766232468733, request method: GET
Request URL: /, Date: 1766232471415, request method: GET

---

## Adding Data to Request Object (req)

Middleware can add or modify data inside the req object, which can then be used in endpoints.

Example

```Javascript

const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')

//Middleware 1

app.use((req, res, next) => {
    console.log('m1')
    //Added name object to req
    req.name = 'John Doe'
    next()
})

//Middleware 2

app.use((req, res, next) => {
    console.log('m2')
    // I can update req object
    req.name = req.name.toUpperCase()
    next()
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/about', (req, res) => {
    // Updated req.name will be shown
    res.send('About page, Hello ' + req.name)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

```

Output on /about:
About page, Hello JOHN DOE

**This is very useful for:**

User authentication data
Role-based access
Passing computed values

---

## Key Points to Remember

Middleware runs before routes

Always call next() unless you want to stop the request

Avoid sending responses from middleware unnecessarily

---

**Middleware is ideal for:**

Logging

Authentication

Validation

Adding request data

---

## Official Documentation (Must-Read)

https://expressjs.com/en/guide/using-middleware.html

---