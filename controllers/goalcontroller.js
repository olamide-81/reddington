// install the async handler to handle errors 
const asyncHandler = require('express-async-handler')

// get goals
//this is where the get request is made and other requests
// and the functions are being exported to
// access to this routes are secured

const getGoals = asyncHandler (async (req, res) => {
    res.json({ message: 'get goals'})
})

// get goals
//this is where the get request is made and other requests
// and the functions are being exported to
// access to this routes are secured

const setGoals = asyncHandler (async (req, res) => {
    if( !req.body.text) {
        res.status(400)
        throw new Error('please add new goals ')
    }
    res.json({ message: 'set goals'})
})
// get goals
//this is where the get request is made and other requests
// and the functions are being exported to
// access to this routes are secured

const updateGoals = asyncHandler (async (req, res) => {
    res.json({ message: 'update goals'})
})
// get goals
//this is where the get request is made and other requests
// and the functions are being exported to
// access to this routes are secured

const deleteGoals = asyncHandler (async (req, res) => {
    res.json({ message: 'delete goals'})
})

module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
}