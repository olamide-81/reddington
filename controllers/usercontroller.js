//async handler to take of errors and because we are making request it is a promise so we will have to await a reponse
const asyncHandler = require('express-async-handler')

//This is to get the model of the database into where the detils or information will be called
const User = require('../model/usermodel')

//jwt is for authentication
const jwt = require('jsonwebtoken')

//bcrypt is also for authentication
const bcrypt = require('bcryptjs')

//This is to register a new user
// /api/users/register
const registerUser = asyncHandler (async (req, res) => {

    //function to check all the needed input if there are inputs if not throw an error
    const { name, email, password } = req.body

    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    //Check if user exist
    const userExist = await User.findOne({email})

    if(userExist) {
        res.status(400)
        throw new Error('User already exists')
    }

     // Hash password
     const salt = await bcrypt.genSalt(10)
     const hashedPassword = await bcrypt.hash(password, salt)
     
     //Create User
     const user = await User.create({
         name,
         email,
         password: hashedPassword
     })

     if(user) {
         res.status(201).json({
             _id: user.id,
             name: user.name,
             email: user.email,
             token: generateToken(user._id)
         })
     }else {
         res.status(400)
         throw new Error('Invalid User Data')
     }
})

//This is to Login user
// /api/users/login
const loginUser = asyncHandler (async(req, res) => {
    const { email, password } = req.body

    //check the email
    const user = await User.findOne({email})

    //check the password
    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
             name: user.name,
             email: user.email,
             token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid Credentials')
    }
})

//This is to get user data
// /api/users/me
const getUser = asyncHandler (async(req, res) => {
    const { _id, name, email} = await User.findById(req.user.id)

    res.status(200)
})

//Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}
module.exports = {
    registerUser,
    loginUser,
    getUser
}