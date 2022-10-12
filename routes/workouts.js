const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    res.json({msg: "Get all workouts"})
})

router.get('/:id', (req, res) => {
    res.json({msg: "Get single workout"})
})

router.post('/', (res, req) => {
    res.json({msg: "Add a workout"})
})

router.patch('/:id', (req, res) => {
    res.json({msg: "Update workout"})
})

router.delete('/:id', (req, res) => {
    res.json({msg: "Delete workout"})
})

module.exports = router