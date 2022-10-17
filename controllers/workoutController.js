const { isValidObjectId } = require('mongoose');
const Workout = require('../models/workoutModel')

// get all workouts

const getAllWorkouts = async (req, res) => {
    const allWorkout = await Workout.find().sort({ createdAt: -1 })
    res.status(200).json(allWorkout);
}

// get single workout

const getSingleWorkout = async (req, res) => {
    const { id } = req.params
    if (isValidObjectId(id)) {
        const workout = await Workout.findById(id)

        if (!workout) {
            res.status(404).json({ error: 'Not found workout' })
        }
        res.status(200).json(workout)
    }

    res.status(500).json({ error: "Insert valid id" })
}


// create a workout

const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body
    let emptyFields = []

    if(!title) {
        emptyFields.push('title')
    }
    if(!reps) {
        emptyFields.push('reps')
    }
    if(!load) {
        emptyFields.push('load')
    }

    if(emptyFields.length > 0) {
        return res.status(422).json({error: 'Please fill in all the fields', emptyFields})
    }

    try {
        const workout = await Workout.create({ title, reps, load })
        res.status(200).json(workout)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// edit workout

const updateWorkout = async (req, res) => {
    const { id } = req.params

    if (isValidObjectId(id)) {
        try {
            const workout = await Workout.updateOne({ _id: id }, { ...req.body })
            if (!workout) {
                res.status(404).json({ error: "Not found workout" })
            }
            res.status(200).json(workout)

        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    } else {
        res.status(404).json({ error: "Not found workout" })
    }
}


// delete workout

const deleteWorkout = async (req, res) => {
    const { id } = req.params

    if (isValidObjectId(id)) {
        const workout = await Workout.findOneAndDelete({ _id: id })
        if (!workout) {
            res.status(404).json({ error: "Not found workout" })
        }
        res.status(200).json(workout)
    } else {
        res.status(404).json({ error: "Not found workout" })
    }
}


module.exports = {
    createWorkout,
    getAllWorkouts,
    getSingleWorkout,
    updateWorkout,
    deleteWorkout
}