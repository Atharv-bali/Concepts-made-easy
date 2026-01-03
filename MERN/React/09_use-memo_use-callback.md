## Index

1) [UseMemo](#usememo)
2) [Example Code](#example-code)
3) [Callback](#callback)
4) [Example Code](#example-code-1)

## UseMemo

useMemo is a React hook used to optimize performance.

It helps us avoid re-running heavy computations on every re-render.
Instead, the computation runs only when its dependencies change.

- When should you use useMemo?

1) When a calculation is expensive (large loops, .find() on big arrays, filtering, sorting)

2) When a component re-renders frequently

3) When the result depends on specific state or props

## Example Code

```Javascript
import { useState, useMemo } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const nums = new Array(3_000_000).fill(0).map((_, i) => {
    return {
      index: i,
      isMagical: i === 2_000_000
    }
  })
  const [count, setCount] = useState(0)
  const [numbers, setNumbers] = useState(nums)

  const magical = numbers.find(item => item.isMagical === true)

  return (
    <>
      <div>
        <span>Magical Number: {magical.index}</span>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button
          onClick={() => {
            setCount((count) => count + 1)
          }}
        >
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

- Problem Without useMemo

In the example above, we search a very large array using .find().

Every time count changes, the component re-renders, and the .find() operation runs again, even though the array hasn’t changed.

**Using memo Code**:

```Javascript
import { useState, useMemo } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const nums = new Array(3_000_000).fill(0).map((_, i) => {
    return {
      index: i,
      isMagical: i === 2_000_000
    }
  })
  const [count, setCount] = useState(0)
  const [numbers, setNumbers] = useState(nums)

  const magical = useMemo(() => {
    return numbers.find((num) => num.isMagical)
  }, [numbers])

  return (
    <>
      <div>
        <span>Magical Number: {magical.index}</span>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button
          onClick={() => {
            setCount((count) => count + 1);
            if (count == 10) {
              setNumbers(new Array(2_000_000).fill(0).map((_, i) => {
                return {
                  index: i,
                  isMagical: i === 1_000_000
                }
              }));
            }
          }
          }
        >
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

## Callback

useCallback is a React hook used to memoize a function.

It prevents a function from being re-created on every render unless its dependencies change.

Think of it like this:

- useMemo → memoizes a value

- callback → memoizes a function

This is especially useful when:

You pass a function as a prop to a child component

The child component is wrapped with React.memo

You want to avoid unnecessary re-renders

- Problem Without useCallback

Every time a component re-renders, functions are recreated in memory.

Even if the logic is the same, React treats the function as new, which causes child components to re-render.

## Example Code

Inside component/Navbar.jsx file

```Javascript
import React from 'react'
import { memo } from 'react'

const Navbar = ({ adjective, getadjective }) => {
    console.log("Page is rendering")
    return (
        < div >
            I am a {adjective} navbar
            <button onClick={() => { getadjective() }}>{getadjective()}</button>
        </div >
    )
}

export default memo(Navbar)
```

Page is rendering will come on console each time you reload the page as adjective will be re-render and so does the navbar

Inside **App.jsx**

```Javascript
import { useState, useCallback } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar.jsx'

function App() {
  const [count, setCount] = useState(0)
  const [adjective, setAdjective] = useState("good")

  const getadjective = () => {
    return "another "
  }

  return (
    <>
      <div>
        <Navbar adjective="awesome" getadjective={getadjective} />
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

Here:

- Clicking the button updates count

- App re-renders

- getAdjective is recreated

- React thinks the prop changed

- Navbar re-renders unnecessarily

---

Using **callback**

Inside **App.jsx**

```Javascript
const getadjective = useCallback(() => {
    return "another " + adjective
  }, [adjective])
```

Here:

- Clicking count button → only App re-renders

- Navbar does NOT re-render

- Navbar re-renders only when adjective changes