## Index
1) [Introduction](#introduction)
2) [How to run server](#how-to-run-server)
3) [Use of get routes](#use-of-get-routes)
4) [Use of slug](#use-of-slug)
5) [Sample code](#sample-code)
6) [Serve static files](#to-serve-static-files)

## Introduction
Express documentation to write basic program: https://expressjs.com/en/starter/hello-world.html

**Why express ?**
Node.js can be used to create a backend server, but writing everything using plain Node.js becomes messy as 
--> The project grows.
--> Problem with pure Node.js
--> Routing is manual
--> Code becomes hard to read
--> Difficult to manage many endpoints

Example using nodejs without express

```Javascript
const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("Home page");
  } else if (req.url === "/about") {
    res.end("About page");
  } else {
    res.end("404 Not Found");
  }
});

server.listen(3000);
```

Express is built on the top of nodejs, it makes the code more easy to understand and organized.

**Same thing using express (more simpler)**

```Javascript
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Home page");
});

app.get("/about", (req, res) => {
  res.send("About page");
});

app.listen(3000);
```

**Advantages with express**

--> Clean and readable routing
--> Built on top of Node.js
--> Easy middleware support
--> Easy to serve static files
--> Better structure and security

---

## How to run server

--> First use npm init -y, then make main.js file
--> We can use "node filename.js", if the page changes it does not automatically re-renders
--> To cure this, we use nodemon, to use it
1) npm install -g nodemon
2) nodemon filename.js

---

## Use of get routes
Basic routing: https://expressjs.com/en/starter/basic-routing.html

```Javascript
const express = require('express')
const app = express()
const port = 3000

// This means if page gives get request to server at / endpoint, server will reply with 'Hello World!'

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/about', (req, res) => {
  res.send('About me')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

---

## Use of slug
If we need to configure many endpoints with similar pattern we can use slug.
It dynamically tells the server what to reply based on the endpoint from where request is coming to the server.

---

## Sample code

```Javascript
const express = require('express')
const app = express()
const port = 3000
// Because of this, Hello World! will be shown at localhost 3000, once we start the server.
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// About me will be shown on localhost:3000/about
app.get('/about', (req, res) => {
  res.send('About me')
})

// I need to make many routes with similar pattern
// app.get('/blog/intro-to-js', (req, res) => {
//     res.send('Hello intro-to-js')
// })

// app.get('/blog/intro-to-python', (req, res) => {
//     res.send('Hello intro-to-python')
// })

// To avoid many routes we use slug

app.get('/blog/:slug', (req, res) => {
    console.log(req)
    res.send(`Hello ${req.params.slug} `)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

---

## To serve static files

Server files at server: https://expressjs.com/en/starter/static-files.html
We don't need all the files to be accessed by the server, therefore files are not served at endpoints.
But if we want we can serve some file at the server, then do following steps:
--> Add this line just above the routes
**app.use(express.static('public'))**
Now every file kept inside public folder will be accessible.

---