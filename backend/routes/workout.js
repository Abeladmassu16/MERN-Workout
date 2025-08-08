const express = require('express')
 const Workout = require('../models/workoutModel')
 const {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout,
 } = require('../controllers/workoutController')

const router = express.Router()
//get all workouts
router.get('/', getWorkouts)
//get single workouts
router.get('/:id', getWorkout)




//post new workouts
router.post('/',createWorkout )
//delete workouts
router.delete('/:id', deleteWorkout)
//update workouts
router.patch('/:id', updateWorkout)


module.exports = router