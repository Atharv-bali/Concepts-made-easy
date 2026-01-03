## Index

1) [Context Hook](#context-hook)
2) [Syntax](#syntax)
3) [Code](#code)

## Context Hook

**Why do we need Context?**

Consider this component structure:

App.jsx
 └── 
    Navbar.jsx
      └── 
          Button.jsx
           └── 
              Count.jsx


Suppose:

count state is defined in App.jsx

Count.jsx needs access to count

Button.jsx also needs to update count

Without Context

You would have to pass count and setCount as props through every level:

App → Navbar → Button → Count

This is called prop drilling and becomes messy in large apps.

To avoid this, we use the Context Hook.

**What is Context?**

Context allows you to share data globally across components without passing props manually at every level.

## Syntax

1) Create a Context

Create a folder named context
Inside it, create context.js
```Javascript
import { createContext } from "react";

export const counterContext = createContext(null);
```

2) Wrap Components with Provider (in App.jsx)

Any component inside Provider can access the context value.
```Javascript
<counterContext.Provider value={{ count, setCount }}>
  <Navbar />
</counterContext.Provider>
```
3) Access Context Using useContext

Inside any component:
```Javascript
import { useContext } from "react";
import { counterContext } from "../context/context";

const value = useContext(counterContext);
```

Now value contains:

{
  count,
  setCount
}

## Code

Inside App.jsx

```Javascript 
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { counterContext } from './context/context'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <counterContext.Provider value={{ count, setCount }}>
        <Navbar />
        <div>
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
      </counterContext.Provider>
    </>
  )
}

export default App
```

Inside **components/Navbar.jsx**

```Javascript
import React from 'react'
import Button from './Button'
const Navbar = () => {
    return (
        <>
            <div>
                I am a Navbar
            </div>
            <Button />
        </>
    )
}

export default Navbar
```

Inside **components/Button.jsx**

- By clicking on button We can increment the count as well.

```Javascript
import React, { useContext } from 'react'
import Components1 from './Components1'
import { counterContext } from '../context/context'

const Button = () => {
    const value = useContext(counterContext)
    return (
        <div>
            <button onClick={() => value.setCount((count) => count + 1)}><span><Components1 /></span>I am a button</button>
        </div>
    )
}

export default Button
```

Inside **components/Components1.jsx**

```Javascript
import { React, useContext } from "react"
import { counterContext } from "../context/context"

const Components1 = () => {
    const value = useContext(counterContext);
    return (
        <div>
            {value.count}
        </div>
    )
}

export default Components1
```
