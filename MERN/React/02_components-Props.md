## Index

1) [Problem with old setup](#the-problem-with-old-setup-create-react-app)
2) [What is Vite](#what-is-vite)
3) [Start Vite app](#start-vite-app)
4) [Components](#components)
5) [Props](#props)
6) [Example code using both](#example-code-using-both)

---

## The Problem with Old Setup (create-react-app)

Earlier we used:
```
npx create-react-app my-app
```

But it has problems:

- Slow startup time

- Slow rebuilds

- Heavy configuration

- Large node_modules

Not ideal for modern apps

This is where Vite comes in.

---

## What is Vite?

Vite is a modern frontend build tool that:

- Starts the dev server instantly

- Updates changes very fast (Hot Reload)

- Uses modern JavaScript (ES modules)

- Produces optimized production builds

Think of Vite as:

A faster and smarter replacement for create-react-app

---

## Start Vite App
Official Documentation:
https://vite.dev/guide/

Commands Used
```
npm create vite@latest
npm run dev
```

What these commands do

npm create vite@latest → creates a ready-to-use project

npm run dev → starts the development server

Your app will open at:
```
http://localhost:5173
```

---

## Components

Components are one of the most important concepts in React.

Why Components?

If we write everything inside App.jsx, the file becomes:

- Very large

- Hard to read

- Hard to debug

So instead, we break UI into small parts called components.

Example Scenario

Suppose your website has:

Navbar

Footer

Cards

Instead of writing all code in App.jsx, we create separate components and then combine them.

**Folder Structure**
```
src/
│
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── Card.jsx
│
└── App.jsx
```

Importing Components in App.jsx (Basic Idea)
```
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Card from './components/Card.jsx'

<Navbar />
<Card />
<Footer />
```

- Code becomes clean
- Errors are easier to find
- Components are reusable

---

## Props

Props are used to send data from parent component to child component.

This makes the app dynamic.

Using Props While Calling Component
```
<Card title="Card 1" description="This is card 1" />
```

Receiving Props in Card.jsx

```Javascript
import React from 'react'
import './Card.css'
const Card = (props) => {
    return (
        <div className='all '>
            <div className='card1'>
                <h1>{props.title}</h1>
                <h3>{props.desc}</h3>
            </div>
        </div>
    )
}

export default Card
```

---

## Example code using both

src/components/Navbar.jsx

```Javascript
import React from 'react'
import './navbar.css'
const Navbar = () => {
    return (
        <div className='app'>
            <nav>
                <ul>
                    <li>Home</li>
                    <li>Contact</li>
                    <li>About</li>
                </ul>
            </nav >
        </div>
    )
}

export default Navbar
```

src/components/Footer.jsx

```Javascript
import React from 'react'
import './Footer.css'
const Footer = () => {
    return (
        <div className='main'>
            <div className='footer'>
                All Rights reserved @ Atharv Bali
            </div>
        </div>
    )
}

export default Footer
```

Inside src/App.jsx

```Javascript
import './App.css'
import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Card from './components/Card'
function App() {
  return (
    <>
      <Navbar />
      <div className='cards'>
        <Card title="card1" desc="This is card 1" />
        <Card title="card2" desc="This is card 2" />
        <Card title="card3" desc="This is card 3" />
        <Card title="card4" desc="This is card 4" />
        <Card title="card5" desc="This is card 5" />
        <Card title="card6" desc="This is card 6" />
      </div>
      <Footer />
    </>
  )
}

export default App
```

**Code** present inside 02_src folder

**Output**: (present inside 02_image.jpg)

---