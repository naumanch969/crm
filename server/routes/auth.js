import express from 'express'
import { register, registerSuccess, login, logout } from '../controllers/auth.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

// POST
router.post('/register', register)   // send notification to manager
router.post('/register-success', registerSuccess)    // send email to user that he's been registered
router.post('/login', login)
router.post('/logout', verifyToken, logout)


export default router