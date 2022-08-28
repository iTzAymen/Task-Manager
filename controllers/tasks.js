const Task = require('../models/task')

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).json({success: true, data: tasks})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, msg: error})
    }
}

const createTask = async (req, res) => {
    console.log(req.body)
    try {
        const task = await Task.create(req.body)
        res.status(201).json({success: true, data: task})
    } catch (error) {
        res.status(500).json({success: false, msg: error})
    }
}

const getTask = async (req, res) => {
    try {
        const {taskId} = req.params
        const task = await Task.findById(taskId)
        if(!task){
            return res.status(404).json({success: false, msg: `No task with _id = ${taskId}`})
        }
        res.status(200).json({success: true, data: task})
    } catch (error) {
        res.status(500).json({success: false, msg: error})
    }
}

const updateTask = async (req, res) => {
    try {
        const {taskId} = req.params
        const task = await Task.findByIdAndUpdate(taskId, req.body, {
            new: true,
            runValidators: true
        })
        if(!task){
            return res.status(404).json({success: false, msg: `No task with _id = ${taskId}`})
        }
        res.status(200).json({success: true, data: task})
    } catch (error) {
        res.status(500).json({success: false, msg: error})
    }
}

const deleteTask = async (req, res) => {
    try {
        const {taskId} = req.params
        const task = await Task.findByIdAndDelete(taskId)
        if(!task){
            return res.status(404).json({success: false, msg: `No task with _id = ${taskId}`})
        }
        res.status(200).json({success: true, data: task})
    } catch (error) {
        res.status(500).json({success: false, msg: error})
    }
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}