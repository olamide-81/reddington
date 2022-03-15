// install the async handler to handle errors 
const asyncHandler = require('express-async-handler')

const Goal = require('../model/model')
const User = require('../model/usermodel')

// get goals
//this is where the get request is made and other requests
// and the functions are being exported to
// access to this routes are secured

const getGoals = asyncHandler (async (req, res) => {
    const goals = await Goal.find({ user: req.user.id })
    res.json(goals)
})

// set goals 
//this is where the post request is made and other requests
// and the functions are being exported to
// access to this routes are secured

const setGoals = asyncHandler (async (req, res) => {
    //Handle error if nothing exists
    if( !req.body.text) {
        res.status(400)
        throw new Error('please add new goals ')
    }

    //create new goal 
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    res.json(goal)
})
// get goals
//this is where the get request is made and other requests
// and the functions are being exported to
// access to this routes are secured

const updateGoals = asyncHandler (async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400) 
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)

    //Check for user 
    if(!user ){
        res.status(401)
        throw new Error('User not found')
    }

    if(goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
        }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.
        body, {
            new: true,
        })
    res.json(updatedGoal)
})
// get goals
//this is where the get request is made and other requests
// and the functions are being exported to
// access to this routes are secured

const deleteGoals = asyncHandler (async (req, res) => {

    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400) 
        throw new Error('Goal not found') 
    }

    const user = await User.findById(req.user.id)

    //Check for user 
    if(!user ){
        res.status(401)
        throw new Error('User not found')
    }

    if(goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
        }

    await goal.remove()
    res.json({ id: req.params.id})
})

module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
}