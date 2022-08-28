const connectDb = require('./db/connect')
const express = require('express')
const tasks = require('./routes/tasks')
const path = require('path')
require('dotenv').config()

const app = express()

app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use('/api/v1/tasks', tasks)

const port = 5000

const start = async () => {
    try{
        await connectDb(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is listening to port ${port}...`)
        })
    }catch(error){
        console.log(error)
    }
}

start()
