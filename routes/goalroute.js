const express = require('express')
const router = express.Router()
const { getGoals, setGoals, updateGoals, deleteGoals } = require('../controllers/goalcontroller')

router.route('/').get(getGoals).post(setGoals)
// To refer to a specific item in this case goals you need to reference an id 
router.route('/:id').put(updateGoals).delete(deleteGoals)

module.exports = router