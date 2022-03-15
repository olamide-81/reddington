const express = require('express')
const router = express.Router()
const { getGoals, setGoals, updateGoals, deleteGoals } = require('../controllers/goalcontroller')

//use this to protect routes
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getGoals).post(protect, setGoals)
// To refer to a specific item in this case goals you need to reference an id 
router.route('/:id').put(protect, updateGoals).delete(protect, deleteGoals)

module.exports = router