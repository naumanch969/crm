import Task from '../models/task.js'
import { createError } from '../utils/error.js'

export const createTask = async (req, res, next) => {
    try {
        const { title, description, dueDate, priority } = req.body
        if (!title || !description || !dueDate || !priority) return next(createError(400, 'Make sure to provide all the fields'))

        const newTask = await Task.create({ userId: req?.user?._id, title, description, dueDate, priority })
        res.status(200).json({ result: newTask, message: 'task created successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))

    }
}

export const getTask = async (req, res, next) => {
    try {

        const { taskId } = req.params

        const findedTask = await Task.findById(taskId)
        if (!findedTask) return next(createError(400, 'Task not exist'))

        res.status(200).json({ result: findedTask, message: 'Task fetched successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))

    }
}

export const getTasks = async (req, res, next) => {
    try {

        // const tasks = await Task.find({ userId: req.user._id })
        const tasks = await Task.find({})
        res.status(200).json({ result: tasks, message: 'tasks fetched successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))

    }
}

export const updateTask = async (req, res, next) => {
    try {

        const { taskId } = req.params

        const updatedTask = await Task.findByIdAndUpdate(taskId, { $set: req.body }, { new: true })
        res.status(200).json({ result: updatedTask, message: 'Task updated successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))

    }
}

export const deleteTask = async (req, res, next) => {
    try {

        const { taskId } = req.params

        const deletedTask = await Task.findByIdAndDelete(taskId)
        res.status(200).json({ result: deletedTask, message: 'Task deleted successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))

    }
}


export const deleteWholeCollection = async (req, res, next) => {
    try {

        const result = await Task.deleteMany()
        res.status(200).json({ result, message: 'Task collection deleted successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}
