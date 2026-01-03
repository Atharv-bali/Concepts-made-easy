## Index

1) [State](#what-is-state-in-react-)
2) [What is Hooks](#what-is-hooks)
3) [Useeffect hooks](#useeffect-hooks)
4) [Code](#code)
---
## What is State in react ?

State is data that belongs to a component and causes the component to re-render when it changes.

When state changes → React re-renders the component

When a normal variable changes → React does NOT re-render

That’s why UI does not update when we use normal variables.

- Normal variable (no re-render)

    let count = 0;

    count++;

- State variable (re-render happens)

    const [count, setCount] = useState(0);
    setCount(count + 1);

---

## What is Hooks

Hooks are special functions that let functional components use React features like:

State

Lifecycle behavior

Side effects

Before hooks, these features were only available in class components.

Examples of hooks

useState → manage state

useEffect → handle side effects (alerts, API calls, timers, etc.)

State is achieved using hooks like useState

---

## useEffect hooks

useEffect runs after render.
It is used for side effects, not rendering UI.

Side effects include:

Alerts

API calls

Timers

Logging

DOM manipulation

**Case-1**: useEffect that runs on every render

Write useeffectsnippet, you will get the suggestion for this.

    useEffect(() => {
        alert("Welcome to my page every time")
    })
    

**Case-2**: useEffect that runs on first render

    useEffect(() => {
        alert("Welcome to my page for the first and last time")
    }, [])

**Case-3**: useEffect that runs only when color is changed

    useEffect(() => {
        alert("Color is changed");
    }, [color]);

Important Rule

If you update a state inside useEffect, and that state causes a re-render, then:

- useEffect may run again
- Can lead to infinite loops if not handled carefully

Example shown inside the code

---

## Code

Inside main.jsx 

```Javascript
import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)
  const [color, setColor] = useState(0)



  useEffect(() => {
    alert("Count is updated")
    setColor(color + 1)
  }, [count])



  return (
    <>
      <div>
        <Navbar color={"Navy" + "cyan" + color} />

        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
```

Inside components/Navbar.jsx

```Javascript
import { React, useEffect } from 'react'

const Navbar = ({ color }) => {

    useEffect(() => {
        alert("Welcome to my page for the first and last time")
    }, [])
    useEffect(() => {
        alert("Welcome to my page every time")
    })
    useEffect(() => {
        alert("Color is changed");
    }, [color]);

    return (
        <div>
            I am a navbar of {color} color hehhehe!!!
        </div>
    );
};


export default Navbar
```

**Output**

- Welcome to my page for first and last time --> Navbar component renders for the first time

- Welcome to my page eveytime --> It will run for every action

- Color was changed --> color was set as 0, therefore this prompt appears

- Count is updated --> count was set as 0, therefore this prompt appears

- Welcome to my page everytime --> When count was set to zero, at that time 

    setColor=(color+1), 
    
    runs because of which navbar component re-renders and therefore welcome to my page everytime comes

- Color was changed --> color was chnaged, because of setColor(color+1)

**What happens**

App renders for the first time

count = 0, color = 0

useEffect runs because count is in dependency array

Alert → "Count is updated"

setColor(color + 1) → color becomes 1

Color change causes Navbar to re-render

---