import express from 'express'
import { register, login, changePassword, sendForgetPasswordOTP, setNewPassword } from '../controllers/auth.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

// POST
router.post('/register', register)
router.post('/login', login)
router.put('/change_password', verifyToken, changePassword)
router.put('/forget_password', sendForgetPasswordOTP)
router.put('/newpassword', setNewPassword)


export default router