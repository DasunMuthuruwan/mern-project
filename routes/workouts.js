const express = require('express')
const { createWorkout, getAllWorkouts, getSingleWorkout, updateWorkout, deleteWorkout } = require('../controllers/workoutController')

const router = express.Router()

router.get('/', getAllWorkouts)

router.get('/:id', getSingleWorkout)

router.post('/', createWorkout)

router.patch('/:id', updateWorkout)

router.delete('/:id', deleteWorkout)

module.exports = router