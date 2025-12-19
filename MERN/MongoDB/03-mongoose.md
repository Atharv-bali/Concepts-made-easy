## How to install mongoose
In terminal write: npm i mongoose
To know more on mongoose:
https://mongoosejs.com/docs/index.html

## How to use mongoose in express App
Installation of express into your project: npm install express
Take the basic template of express app from here: https://expressjs.com/

**Create main.js**

```Javascript
import mongoose from 'mongoose'
import express from 'express'
import { learn } from './models/learn_mongoose.js'

const conn = await mongoose.connect('mongodb://localhost:27017/learn_mongoose')
const app = express()
const port = 3000

app.get('/', async (req, res) => {
    const Learn = new learn({ name: 'Fluffy', desc: 'A cute kitten', isDone: false })
    await Learn.save()
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
```

**Create a folder, let's say models, inside models create a learn_mongoose.js**

```javascript
import mongoose from "mongoose";


const kittySchema = new mongoose.Schema({
    name: String,
    desc: String,
    isDone: Boolean
});

export const learn = mongoose.model('learn', kittySchema);
```
