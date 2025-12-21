## Index
1) [Introduction to post request](#introduction-to-post-request)
2) [Code to check post request](#code-to-check-post-request)
3) [Serving HTML files](#serving-html-files)
4) [Postman](#postman)
5) [Express router](#express-router)

## Introduction to post request

A POST request is used when we want to send data from the frontend to the backend.

Why POST instead of GET?

In GET requests, data appears in the URL.
In POST requests, data is sent in the request body, so it is more secure.
POST is commonly used for:
Login forms
Sign-up forms
Sending user data

Refer to this: https://expressjs.com/en/starter/basic-routing.html

---

## Code to check post request

**Step 1:** Create a public folder

Inside public, create a file called mypage.html

mypage.html

This file sends a POST request to the backend and prints the response in the browser console.

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My post request Page</title>
</head>

<body>
    <script>
        async function testbox() {
            let a = await fetch("/", { method: "POST" })
            let b = await a.text()
            console.log(b)
        }

        testbox()
    </script>
</body>

</html>
```

**Step 2:** Backend code (main.js)

```Javascript
const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))

app.post('/', (req, res) => {
    console.log("Hey it's a post request")
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

```

**To run this**

1) npm init -y

2) npm install express

3) nodemon main.js

Open browser → http://localhost:3000/mypage.html

Check browser console → you will see:

Hello post request

---

## Serving HTML files

Serving an HTML file means:

The server sends an HTML file when a user hits a specific endpoint. 

Response methods
The methods on the response object (res) in the following table can send a response to the client, and terminate the request-response cycle. If none of these methods are called from a route handler, the client request will be left hanging.

Method	            Description
res.download()	    Prompt a file to be downloaded.
res.end()	        End the response process.
res.json()	        Send a JSON response.
res.jsonp()	        Send a JSON response with JSONP support.
res.redirect()	    Redirect a request.
res.render()	    Render a view template.
res.send()	        Send a response of various types.
res.sendFile()	    Send a file as an octet stream.
res.sendStatus()	Set the response status code and send its string              representation as the response body.

project
│── templates
│   └── index.html
│── public
│── main.js

Example: templates/index.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <b>Heyy!!! I am bold</b>
    This is index.html
</body>

</html>
```
Open in browser:

http://localhost:3000/index

**main.js**

```Javascript
const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/index', (req, res) => {
    res.sendFile('templates/index.html', { root: __dirname })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
```

---

## Postman
Postman helps you test APIs without frontend code.

Steps:

Step 1 --> Download Postman https://www.postman.com/downloads/

Step 2 --> Install it

Step 3 --> Create a Workspace

Step 4 --> Click New → HTTP Request

Step 5 --> Choose request type (GET / POST)

Step 6 --> Enter URL and send request

You will instantly see the response from your backend.

---

## Express Router

When your project grows, putting all routes in main.js becomes messy.

Express Router helps divide routes into separate files.

Reference:
https://expressjs.com/en/guide/routing.html

Example: Cricket & Football Routes

**Inside main.js**

```Javascript
const express = require('express')
// This tells location from where endpoint football will be fetched
const football = require('./routes/football')

const app = express()
const port = 3000

app.use(express.static('public'))
// For /football use football which is declared above
app.use('/football', football)

app.get('/cricket', (req, res) => {
    res.send("Hello cricket")
})

app.get('/cricket/ball', (req, res) => {
    res.send("Hello cricket ball")
})

app.get('/cricket/bat', (req, res) => {
    res.send("Hello cricket bat")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
```

**routes/football.js**

```Javascript
const express = require('express')
const router = express.Router()

// define the home page route
router.get('/', (req, res) => {
    res.send('Hello football')
})
// define the about route
router.get('/about', (req, res) => {
    res.send('About football')
})

module.exports = router
```

Because of this code all main.js endpoints are working also, /football, /football/about are working

---