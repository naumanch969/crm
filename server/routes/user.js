import express from 'express'
import { getUsers, getUser, createClient,createEmployee, updateRole, updateUser, deleteUser, getClients, getEmployees, deleteWholeCollection } from '../controllers/user.js'
import { verifyManager, verifyEmployee, verifyToken } from '../middleware/auth.js'

const router = express.Router()

const verifyIsSameUser = (req, res, next) => {
    try {
        if (req.user._id == req.params.userId || req.user.role == ('manager' || 'super-admin')) next()
        else next(createError(401, 'Only specific user can access this route'))
    } catch (err) {
        next(createError(500, err.message))

    }
}

// GET
router.get('/get/all', getUsers)///verifyToken,
router.get('/get/single/:userId', getUser)//verifyToken, verifyIsSameUser,
router.get('/get/clients', getClients)//verifyToken, verifyEmployee,
router.get('/get/employees', getEmployees)//verifyToken, verifyManager,

// POST 
router.post('/create/client', createClient)
router.post('/create/employee', createEmployee)

// PUT
router.put('/update-role/:userId', updateRole)//verifyToken, verifyManager,
router.put('/update/:userId', updateUser)//verifyToken, verifyIsSameUser,

// DELETE
router.delete('/delete/:userId', deleteUser)//verifyToken, verifyIsSameUser,
router.delete('/delete-whole-collection', deleteWholeCollection)

export default router