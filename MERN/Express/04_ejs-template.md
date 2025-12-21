## Index

1) [What is EJS](#what-is-ejs)
2) [Why EJS](#why-ejs)
3) [Sending data from Express to EJS](#sending-data-from-express-backend-to-ejs-frontend)
4) [Reusable components](#reusing-components-include-one-ejs-inside-another)
5) [Key Takeaways](#key-takeaways)

---

## What is ejs?

EJS (Embedded JavaScript) is a view template engine used with Express.

It helps us dynamically generate HTML pages using data coming from the backend (database, variables, arrays, etc.).

In simple words:
EJS = HTML + JavaScript logic

So yes, you can think of EJS as dynamic HTML.

---

## Why EJS

EJS is mainly used because:

Express (backend) can send data to EJS

EJS can display that data inside HTML

We can reuse components (navbar, footer, etc.)

It is very useful for production-level websites

**What Express + EJS together do**

Express → fetches data from database

EJS → displays that data on the web page

---

## Sending Data from Express (Backend) to EJS (Frontend)

To quickly design frontend UI, we can use Bootstrap.

Useful links:

Bootstrap docs:
https://getbootstrap.com/docs/5.3/getting-started/introduction/

Navbar component:
https://getbootstrap.com/docs/5.3/components/navbar/

Make a view folder, inside view make a page index.ejs

**Project Setup**
Step-by-step commands
npm init -y
npm install express ejs
Make file main.js
nodemon main.js

**Basic Express + EJS Setup**

**Inside main.js**

```Javascript
const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    // Consider these items from a database now show this on ejs template
    let siteName = "ADDIDAS"
    let searchText = "Search Now"
    let arr = [44, 55, 66]
    res.render("index", { siteName: siteName, searchText: searchText, arr })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
```

**Important EJS Syntax**

**<%- include() %>** is used to include another EJS file
**<%= %>** Used to print values inside HTML

Outputs the value to the page

Example:

<%= siteName %>

Creating the EJS View

**Folder structure:**

project
│
├── views
│   └── index.ejs
│
└── main.js

**Inside index.ejs**

```ejs
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <%= siteName %>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Dropdown
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">
                                    <%= arr[0] %>
                                </a></li>
                            <li><a class="dropdown-item" href="#">
                                    <%= arr[1] %>
                                </a></li>
                            <li><a class="dropdown-item" href="#">
                                    <%= arr[2] %>
                                </a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link disabled" aria-disabled="true">Disabled</a>
                    </li>
                </ul>
                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="<%= searchText %>"
                        aria-label="Search" />
                    <button class="btn btn-outline-success" type="submit">
                        Search
                    </button>
                </form>
            </div>
        </div>
    </nav>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>
```

Output: https://github.com/Atharv-bali/Concepts-made-easy/blob/main/MERN/Express/output1ejs.png

Values are coming from Express
HTML is generated dynamically

---

## Reusing Components (Include One EJS Inside Another)

This is one of the biggest advantages of EJS.

Example: Navbar as a Separate File

**main.js**

```Javascript
const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    // Consider these items from a database now show this on ejs template
    let siteName = "ADDIDAS"
    let searchText = "Search Now"
    let arr = [44, 55, 66]
    res.render("index", { siteName: siteName, searchText: searchText, arr })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
```

Inside views folder, make a file **index.ejs**

```ejs
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>
    <%- include('navbar', { siteName: 'Puma' }); %>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>
```

Inside views folder make another file **navbar.ejs**

```ejs
<nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">
            <%= siteName%>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        Dropdown
                    </a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">
                                <%= arr[0] %>
                            </a></li>
                        <li><a class="dropdown-item" href="#">
                                <%= arr[1] %>
                            </a></li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li><a class="dropdown-item" href="#">
                                <%= arr[2] %>
                            </a></li>
                    </ul>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" aria-disabled="true">Disabled</a>
                </li>
            </ul>
            <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="<%=searchText%>" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">
                    Search
                </button>
            </form>
        </div>
    </div>
</nav>
```

Output: https://github.com/Atharv-bali/Concepts-made-easy/blob/main/MERN/Express/output2ejs.png

---

## Key Takeaways

EJS is used to create dynamic HTML

Express sends data → EJS displays data

<%= %> prints values

<%- include() %> helps reuse components

EJS is perfect for server-side rendering

**For more information, refer to this**: https://ejs.co/

---
