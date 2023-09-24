import Task from '../models/task.js'
import User from '../models/user.js'
import { createError, isValidDate } from '../utils/error.js'

export const createTask = async (req, res, next) => {
    try {
        const { completedTask, completedTaskDate, completedTaskStatus, completedTaskComment, newTask, newTaskDeadline, newTaskComment } = req.body
        if (!completedTask || !completedTaskDate || !completedTaskStatus || !completedTaskComment || !newTask || !newTaskComment || !newTaskDeadline) return next(createError(400, 'Make sure to provide all the fields'))

        const createdTask = await Task.create({ userId: req?.user?._id, ...req.body })
        res.status(200).json({ result: createdTask, message: 'task created successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const getTask = async (req, res, next) => {
    try {

        const { taskId } = req.params;
        const task = await Task.findById(taskId);

        res.status(200).json({ result: task, message: 'Task fetched successfully', success: true });
    } catch (err) {
        next(createError(500, err.message));
    }
};


export const getUserTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({ userId: req.user._id });
        res.status(200).json({ result: tasks, message: 'tasks fetched successfully', success: true });
    } catch (err) {
        next(createError(500, err.message));
    }
}; 

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