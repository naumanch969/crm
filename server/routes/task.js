import express from 'express'
import { createTask, getTask, getUserTasks, updateTask, deleteTask, deleteWholeCollection, } from '../controllers/task.js'
import { verifyEmployee, verifyToken } from '../middleware/auth.js'
import Task from '../models/task.js'
import { createError } from '../utils/error.js'

const router = express.Router()

const verifyIsSame = async (req, res, next) => {
    try {
        const { taskId } = req.params
        const findedTask = await Task.findById(taskId)
        if (!Boolean(findedTask)) return next(createError(400, 'task not exist'))

        if (findedTask.userId == req.user._id || req.user.role == ('manager' || 'super_admin')) next()
        else next(createError(401, "This task isn't belong to you"))
    } catch (err) {
        next(createError(500, err.message))
    }
}

// GET
router.get('/get/all', verifyToken, getUserTasks)
router.get('/get/single/:taskId', verifyToken, verifyEmployee, verifyIsSame, getTask)

// POST
router.post('/create', verifyToken, verifyEmployee, createTask)

// PUT
router.put('/update/:taskId', verifyToken, verifyIsSame, updateTask)

// DELETE
router.delete('/delete/:taskId', verifyToken, verifyIsSame, deleteTask)
router.delete('/delete-whole-collection', deleteWholeCollection)

export default router