import express from 'express'
import { getUsers, getUser, getEmployeeClients,filterUser, createClient, createEmployee, updateRole, updateUser, deleteUser, getClients, getEmployees, deleteWholeCollection } from '../controllers/user.js'
import { verifyManager, verifyEmployee, verifyToken, verifySuperAdmin } from '../middleware/auth.js'
import { createError } from '../utils/error.js'

const router = express.Router()

const verifyIsSameUser = (req, res, next) => {
    try {
        if (req.user._id == req.params.userId || req.user.role == ('manager' || 'super_admin')) next()
        else next(createError(401, 'Only specific user can access this route'))
    } catch (err) {
        next(createError(500, err.message))

    }
}

// GET
router.get('/get/all', verifyToken, verifyManager, getUsers)
router.get('/get/single/:userId', verifyToken, verifyIsSameUser, getUser)
router.get('/get/clients', verifyToken, verifyEmployee, getClients)
router.get('/get/clients/employee', verifyToken, verifyEmployee, getEmployeeClients)
router.get('/get/employees', verifyToken, verifyEmployee, getEmployees)
router.get('/filter', verifyToken, verifyEmployee, filterUser)

// POST 
router.post('/create/client', verifyToken, verifyEmployee, createClient)
router.post('/create/employee', verifyToken, verifyManager, createEmployee)

// PUT
router.put('/update-role/:userId', verifyToken, verifyManager, updateRole)
router.put('/update/:userId', verifyToken, verifySuperAdmin, updateUser)

// DELETE
router.delete('/delete/:userId', verifyToken, verifySuperAdmin, deleteUser)
router.delete('/delete-whole-collection', deleteWholeCollection)

export default router