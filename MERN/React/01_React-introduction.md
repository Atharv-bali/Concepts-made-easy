## Index

1) [Why React](#why-react)
2) [Advantage of React](#advantages-of-react)
3) [How to start react app](#how-to-start-react-app)
4) [File structure Explanation](#file-structure-explanation)
5) [Writin code for point 1](#writing-code-for-point-1)
6) [Writing code for point 2](#writing-code-for-point-2)

---

## Why React

A common question is:

If we already have HTML, CSS, and JavaScript, why do we need React?

**The problem with plain HTML, CSS, and JS**

When we build large, real-world websites, the code becomes:

Very long

Hard to manage

Difficult to reuse

Messy when updating the UI using document.getElementById() and innerHTML

React solves these problems.

---

## Advantages of React

Advantages of React
1) Component-based structure (Better Management)

React allows us to divide the UI into small reusable components.

Example:

Navbar

Footer

Sidebar

Cards

This makes code:

Cleaner

Easier to read

Easier to maintain

2) Easy Data Handling (No innerHTML)

In normal JavaScript, to change content you do this:

document.getElementById("count").innerHTML = value;


In React, you simply write:

{value}


React automatically updates the UI when the value changes.

3) Efficient DOM Updates (Virtual DOM)

React uses a Virtual DOM, which:

Updates only the changed part of the page

Makes applications faster

Improves performance in large apps

---

## How to start react app
Official Documentation

🔗 https://react.dev/learn/creating-a-react-app

**Steps to Create a React App**

Open terminal and run:
```
npx create-react-app intro-react
```
Then go inside the folder and start the server:
```
npm start
```

Your React app will open at:

```
http://localhost:3000
```

---

## File Structure Explanation
Inside the src folder:

App.js → Main file where we write our code

App.css → Default CSS file

index.js → Entry point (renders App component)

src/components/ → Folder to store reusable components

---

## Writing code for point 1

Create Components Folder

Inside src, create a folder named:

components

**Navbar Component**

components/Navbar.js

(Shortcut: racfe → Enter)

```Javascript
import React from 'react'

const Navbar = () => {
    return (
        <div>
            Hello I am Navbar
        </div>
    )
}

export default Navbar
```

components/**Footer.js**

```Javascript
import React from 'react'

const Footer = () => {
    return (
        <div>
            Hello I am footer
        </div>
    )
}

export default Footer
```

Inside **App.js**

```Javascript
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div> Hello World</div>
      <Footer />
    </div>
  );
}

export default App;
```

Here the page will be showing 

Hello I am Navbar

Hello World

Hello I am Footer

---

## Writing code for point 2

Inside **App.js**

```Javascript
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  // value is used to get initial value, setvalue is used to update value
  const [value, setvalue] = useState(0);
  return (
    <div className="App">
      <div>{value}</div>
      <div><button onClick={() => setvalue(value + 1)}>Click me</button></div>
    </div>
  );
}

export default App;
```

Output will be showing 
```
0
Click me
```
Once you click on **Click me**, 0 starts getting incremented.

This file gives only an overview of why React is useful.
Upcoming topics would cover:

JSX

Props

State

Events

Conditional rendering

Lists & keys

Hooks

---