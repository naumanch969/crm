import express from 'express'
import { createTask, getTask, getTasks, updateTask, deleteTask, deleteWholeCollection } from '../controllers/task.js'
import { verifyEmployee, verifyToken } from '../middleware/auth.js'
import Task from '../models/task.js'
import { createError } from '../utils/error.js'

const router = express.Router()

const verifyIsSame = async (req, res, next) => {
    try {
        const { taskId } = req.params
        const findedTask = await Task.findById(taskId)
        if (!Boolean(findedTask)) return next(createError(400, 'task not exist'))

        if (findedTask.userId == req.user._id || req.user.role == ('manager' || 'super-admin')) next()
        else next(createError(401, "This task isn't belong to you"))
    } catch (err) {
        next(createError(500, err.message))

    }
}

// GET
router.get('/get/all', getTasks)//verifyToken,
router.get('/get/single/:taskId', getTask) // verifyToken, verifyEmployee, verifyIsSame,

// POST
router.post('/create', createTask)//verifyToken, verifyEmployee,

// PUT
router.put('/update/:taskId', updateTask)//verifyToken, verifyIsSame, 

// DELETE
router.delete('/delete/:taskId', deleteTask)//verifyToken, verifyIsSame, 
router.delete('/delete-whole-collection', deleteWholeCollection)

export default router