 require('dotenv').config()

    const express = require('express')
    const mongoose= require('mongoose')
    const workoutRoutes = require('./routes/workout')


 const app = express()

 app.use(express.json())
 app.use((req, res, next)=> {
    console.log(req.path, req.method)
    next()
 })

        //routes
 app.use('/api/workouts',workoutRoutes)

        // conncetions
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('connect to db and listen on port',process.env.PORT)
    })
})
.catch((error)=>{
    console.log(error)
})