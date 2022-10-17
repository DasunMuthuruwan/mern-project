require('dotenv').config()

const express = require('express')
const workoutRoutes = require('./routes/workouts')
const mongoose = require('mongoose')
const cors = require('cors')

// config express

const app = express()

// middleware
app.use(express.json())
app.use(cors())

app.use('/api/workouts', workoutRoutes)

const port = process.env.PORT

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(port, () => {
            console.log(`Connected to db & Listening in port ${port}`)
        })
    })
    .catch((error) => {
        console.log(error);
    })


