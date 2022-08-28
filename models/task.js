const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    task_name: {
        type: String,
        required: [true, 'must provide a task_name'],
        trim: true,
        maxlength: [20, 'task_name cannot be more than 20 characters']
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Task', TaskSchema)