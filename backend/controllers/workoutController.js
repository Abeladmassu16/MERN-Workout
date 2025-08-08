const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// Get all workouts
const getWorkouts = async (req, res) => {
  
    // use Workout.find, and store results in a different variable
    const workouts = await Workout.find({}).sort({ createdAt: -1 })
    return res.status(200).json(workouts)
 
}

// Get single workout
const getWorkout = async (req, res) => {
  const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such workout'})
    }

    const workout = await Workout.findById(id)
    if (!workout) {
      return res.status(404).json({ error: 'No such workout' })
    }
    return res.status(200).json(workout)
  
  }


// Create new workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body

  let emptyFields = []
  if(!title){
    emptyFields.push('title')
  }
    if(!load){
    emptyFields.push('load')
  }

    if(!reps){
    emptyFields.push('reps')
  }
  if(emptyFields.length<0){
    return res.status(400).json({error: 'please fill in all the fields', emptyFields})
  }


  try {
    const workout = await Workout.create({ title, reps, load })
    return res.status(200).json(workout)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

    //delete workout
    const deleteWorkout = async (req, res) => {
  const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such workout'})
    }

    const workout = await Workout.findByIdAndDelete({_id :id})
    if (!workout) {
      return res.status(400).json({ error: 'No such workout' })
    }
    res.status(200).json(workout)
}

    // update workout
      const updateWorkout = async (req, res) => {
  const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such workout'})
    }
        const workout = await Workout.findByIdAndUpdate({_id: id},{
            ...req.body
        })
        if (!workout) {
      return res.status(400).json({ error: 'No such workout' })
    }
    res.status(200).json(workout)

      }

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
}
