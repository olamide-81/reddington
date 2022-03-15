const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT
const connectDB = require('./config/db')
const {errorHandler} = require('./middleware/errorMiddleware')

//Connect to DB
connectDB()

//express app 
const app = express()

//middleware to handle passing data in the body
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Route to get the goals or in any case information stored in the db
app.use('/api/goals', require('./routes/goalroute'))
//Route to fetch user
app.use('/api/users', require('./routes/userroute'))

//error handler midleware
app.use(errorHandler)

//listening for request
app.listen(port, () => console.log(`server has started on port ${port}`))