
require('dotenv/config')

// initialize express, mongoose
const express = require('express');
const mongoose = require('mongoose')
const app = express();
const CustomError = require('./utils/customError')
// const cors = require('cors');

// middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json()); // convert the response to json on every route
// app.use(cors);  // enable cors 


const customersRoute = require('./routes/customers');
const inventoryRoute  = require('./routes/inventory');
const repairsRoute = require('./routes/repairs');

app.use('/customers', customersRoute);
app.use('/inventory', inventoryRoute);
app.use('/repairs', repairsRoute);


app.all('*',(req,res,next) => {
    const err = new CustomError(`Requested URL ${req.path} not found`,404);
    next(err)
})
// global error handler here
app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500 // if there is specific status code, store that , else 500

    res.status(statusCode).json({
        message: err.message,
        success:0,
        stack: err.stack
    })
})


app.get('/' , (req,res) => {
    res.send("connected to home")
});
//  listen to server
app.listen(3000);

// using mongodb
// connect to database, this project will be using mongoose ORM to model the data
mongoose.connect(
    process.env.DB_CONNECT, () => console.log('db connected')
);


// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://tirth:<password>@cluster0.blxsv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
