## Example code for CRUD 
**Makes a databse named mongoDB**
```Javascript
use("mongoDB")
// Inside database creates a collection
// db is used point the current database object 
db.createCollection("courses")

db.courses.insertOne({
    name: "Rohan Mishra",
    price: 0,
    assignments: 12,
    projects: 45
})

db.courses.insertMany([
    {
        "name": "Rohan Mishra",
        "price": 0,
        "assignments": 12,
        "projects": 45
    },
    {
        "name": "Ishaan Mehra",
        "price": 0,
        "assignments": 15,
        "projects": 38
    },
    {
        "name": "Riya Kapoor",
        "price": 0,
        "assignments": 10,
        "projects": 50
    },
    {
        "name": "Veer Chawla",
        "price": 0,
        "assignments": 8,
        "projects": 42
    },
    {
        "name": "Ananya Sharma",
        "price": 0,
        "assignments": 13,
        "projects": 47
    },
    {
        "name": "Kabir Sethi",
        "price": 0,
        "assignments": 11,
        "projects": 40
    },
    {
        "name": "Saanvi Bhatia",
        "price": 0,
        "assignments": 9,
        "projects": 44
    },
    {
        "name": "Arjun Malhotra",
        "price": 0,
        "assignments": 14,
        "projects": 41
    },
    {
        "name": "Meera Joshi",
        "price": 0,
        "assignments": 7,
        "projects": 48
    },
    {
        "name": "Devansh Khanna",
        "price": 0,
        "assignments": 12,
        "projects": 46
    }
]
)
```

**If we run these operations once we will get**
https://github.com/Atharv-bali/Concepts-made-easy/blob/main/MERN/MongoDB/mongoDB.courses.json

## Why to use mongoose, when we have MongoDB
MongoDB is very flexible, and at times too flexible
It does not validates the data that we need to enter
For ex: If we define our schema, in that one of the variable is 
"name":String
If we insert number mongodb will take it.
So we use Mongoose, it is actually an Object Data Modelling (ODM) i.e. it's operation does
Javascript --> MongoDB 
MongoDB --> Javascript
