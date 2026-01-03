## Index

1) [React Router](#react-router)
2) [Basic Setup of React Router](#basic-setup-of-react-router)
3) [Dynamic Routing using getParams](#dynamic-routing-using-useparams)

## React Router

React Router is used to create multiple pages in a React application.

The biggest advantage is:

Pages change without reloading the browser

It works like a Single Page Application (SPA)

## Basic Setup of React Router

Step 1: Install React Router

Open the terminal and run:

```
npm i react-router-dom
```

Step 2: Import Router Functions

In App.jsx, import:
```
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
```

Step 3: Create Components

Create a folder named components and add files like:

- Navbar.jsx

- Home.jsx

- About.jsx

- Contact.jsx

- User.jsx

Each file represents a page or component.

Step 4 --> Make Basic navbar, inside Navbar.jsx and give option inside it like Home, About, Contact

Inside **Navbar.jsx**

```Javascript
import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
    return (
        <div>
            <nav>
                <ul>
                    <NavLink className={(e) => { return e.isActive ? "red" : "" }} to='/'><li>Home</li></NavLink>
                    <NavLink className={(e) => { return e.isActive ? "red" : "" }} to='/about'><li>About</li></NavLink>
                    <NavLink className={(e) => { return e.isActive ? "red" : "" }} to='/contact'><li>Contact</li></NavLink>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar
```
**Important Points**

NavLink is used instead of "a href", to="/" decides which route to go to, isActive helps apply a CSS class to the currently active page


Inside **App.jsx**

```Javascript
import Navbar from './components/Navbar.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Home from './components/Home.jsx'
import User from './components/user.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <><Navbar /><Home /></>
    },
    {
      path: '/about',
      element: <><Navbar /><About /></>
    },
    {
      path: '/contact',
      element: <><Navbar /><Contact /></>
    },
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
```

```
{
  path: '/',
  element: <><Navbar /><Home /></>
}
```

Meaning:

When the URL is /

React renders:

Navbar

Home page

So the navbar stays common, and only the page content changes.

Step 5 --> Make basic Home.jsx, About.jsx and Contact.jsx pages. 

## Dynamic Routing using useParams

What is useParams?

useParams is used to read dynamic values from the URL.

Example URL:

/user/atharv


Here:

atharv is a dynamic value

Inside **App.jsx**

```Javascript
import Navbar from './components/Navbar.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Home from './components/Home.jsx'
import User from './components/user.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

function App() {
  const router = createBrowserRouter([
    {
      path: '/user/:username',
      element: <><Navbar /><User /></>
    },
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
```

Inside User.jsx inside components folder

```Javascript
import { useParams } from "react-router-dom";

function User() {
    const { username } = useParams();
    return <h1>User: {username}</h1>;
}

export default User;
```

Now go to endpoint /user/name, route shows that name