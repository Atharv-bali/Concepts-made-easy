## Index

1) [Handling events](#handling-events)
2) [onClick Example](#onclick-example)
3) [Mouse listener Example](#mouse-listener-example)
4) [onChange Example](#onchange-example)
7) [Handling multiple inputs in form](#handling-multiple-input-in-form)
8) [Code](#code)

---

## Handling events

Handling events means responding to user actions and updating the state of the page when something happens.

User actions (events) can be:

- Mouse events (hover, move, etc.)

- Click events

- Input change events

- Keyboard events, and more

React uses camelCase for event names (e.g., onClick, onChange).

## onClick Example

This event runs a function when a button is clicked.

Inside function of App.jsx

```Javascript
<button onClick={handleClick}>Click me</button>
```

Function of handleClick

```Javascript
const handleClick = () => {
    alert("Button is clicked")
}
```

## Mouse listener Example

This event runs when the mouse pointer moves over an element.

Inside function of App.jsx

```Javascript
<div onMouseOver={handleMouseOver}>Mouse hover</div>
```

Function of handleMouseOver

```Javascript
const handleClick = () => {
    alert("Button is clicked")
}
```

## onChange example

If an input is controlled using useState, its value will not change unless you handle onChange.

If I make a variable using useState hook

```Javascript
const [name, setName] = useState("Rohan")

// Inside function
<input type='text' value={name} />
```

My value inside the input text will not change, instead I should use **onChange**

```Javascript
const handleChange = (e) => {
    setName(e.target.value)
}

<input type='text' value={name} onChange={handleChange} />
```

## Handling multiple input in form

```Javascript
const [form, setForm] = useState({ name: "", email: "" })

const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
}

<input type='text' name='name' value={form.name} onChange={handleChange} />
<input type='text' name='email' value={form.email} onChange={handleChange} />
```

## Code

```Javascript
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState("Rohan")
  const [form, setForm] = useState({ name: "", email: "" })

  const handleMouseOver = () => {
    alert("Mouse is over me")
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleClick = () => {
    alert("Button is clicked")
  }
  return (
    <>
      <button onClick={handleClick}>Click me</button>
      <div onMouseOver={handleMouseOver}>Mouse hover</div>
      <input type='text' value={name} onChange={handleChange} />

      <input type='text' name='name' value={form.name} onChange={handleChange} />
      <input type='text' name='email' value={form.email} onChange={handleChange} />
    </>
  )
}

export default App
```