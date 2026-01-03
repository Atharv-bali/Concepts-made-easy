## Index

1) [Conditional Rendering](#conditional-rendering)
2) [Rendering a list](#rendering-a-list)
3) [Code](#code)

## Conditional Rendering

Conditional rendering means showing or hiding something on the screen based on a condition.

For example:

- Show a button only when a state is true

- Hide the button when the state becomes false

- Toggle it using a button click

Example using useState
```
{showBtn ? <button>Button is visible</button> : null}
```

If showBtn is true → the button is shown

If showBtn is false → nothing is rendered

**Cleaner & Recommended Way**
```
{showBtn && <button>Button is visible</button>}
```

This works because:

true && JSX → JSX is rendered

false && JSX → nothing is rendered

## Rendering a list

When you have multiple items (like todos), you render them using the map() function.

**Step 1:** Store the list in state

```Javascript
const [todos, setTodos] = useState([
  {
    title: "HEYYY!!!",
    desc: "I am a good todo"
  },
  {
    title: "HEYYY!!! I am a todo",
    desc: "I am a better todo"
  },
  {
    title: "HEYYY!!! grocery todo",
    desc: "I am a grocery todo"
  }
])
```

Step 2: Render the list using map()

```Javascript
{todos.map((todo) => (
  <div key={todo.title}>
    <div className="todo">{todo.title}</div>
    <div className="todo">{todo.desc}</div>
  </div>
))}
```

Important Rule 

- Every list item must have a unique key

- The key helps React update the list efficiently

## Code

**Inside terminal for project setup**

```
npm create vite@latest
npm install
npm run dev
```

Inside **App.js**

```Javascript
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [showbtn, setshowbtn] = useState(false)
  const [todos, setTodos] = useState([
    {
      title: "HEYYY!!!",
      desc: "I am a good todo"
    },
    {
      title: "HEYYY!!! I am a todo",
      desc: "I am a better todo"
    },
    {
      title: "HEYYY!!! grocery todo",
      desc: "I am a grocery todo"
    },
  ])

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
      {/* {showbtn && <button>show btn can be clicked</button>} */}
      {todos.map(todo => {
        return <div key={todo.title}>
          <div className="todo">{todo.title}</div>
          <div className="todo">{todo.desc}</div>
        </div>
      }
      )}
      {showbtn ? <button>show btn can be clicked</button> : ""}
      <div className="card">
        <button onClick={() => setshowbtn(!showbtn)}>
          Toggle
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

**Output:**

- Clicking Toggle:

    Shows the button

    Clicking again hides it

- The todo list is always visible

React automatically updates the UI when state changes