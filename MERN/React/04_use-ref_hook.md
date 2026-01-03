## Index

1) [Use-ref hook](#what-is-useref-hook-)
2) [Useref used as a variable](#use-of-useref-to-count-renders)
3) [Useref to change the style](#use-of-useref-in-changing-the-style)
4) [Difference between useState and useRef](#difference-between-usestate-and-useref)

## What is useref hook ?

useRef is a React hook used to store values or access DOM elements without causing a re-render.

Unlike useState, updating a useRef value does not re-render the component.

Important points:

useRef keeps the same value even after re-render

Changing .current does not update the UI automatically

Mainly used for:

Accessing DOM elements

Storing values between renders

Counting renders

**Syntax**
```
const ref = useRef(initialValue)
```
To access or update the value:
```
ref.current
```

---

## Use of useref to count renders

```Javascript
import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const a = useRef(0)

  useEffect(() => {
    // use ref to count renders
    a.current = a.current + 1
    console.log(`Rerendering the items ${a.current}`)
  })


  return (
    <>
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
      </div >
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
```

---

## Use of useRef in changing the style

**Here I will make a button, named Change me, whenever I will click on it, count button will get disappeared**

```Javascript
import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const a = useRef(0)
  const btnref = useRef()

  useEffect(() => {
    // use ref to count renders
    a.current = a.current + 1
    console.log(`Rerendering the items ${a.current}`)
  })


  return (
    <>
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

        {/* refer which item needs to be changed */}
        <button ref={btnref} onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div >
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      {/* after which button is clicked, it will be hidden */}
      <button onClick={() => {
        btnref.current.style.display = "none"
      }}>Change me</button>
    </>
  )
}

export default App
```

---

## Difference between useState and useRef

Feature	                        useState	useRef

- useState causes re-renders

- useState is used to update UI

- Both stores value between renders

- useRef access DOM values

---

## Important prototypes for useRef

Checkout other usage of useRef: https://react.dev/reference/react/useRef