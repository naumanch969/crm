import User from '../models/user.js'
import Notification from '../models/notification.js'
import { createError } from '../utils/error.js'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'


export const register = async (req, res, next) => {
    try {

        let { firstName, lastName, username, phone, email, password, city, role, project } = req.body

        if (!firstName || !lastName || !username || !phone || !password || !city || !project) return next(createError(400, 'Make sure to provide all the fields'))
        if (email && !validator.isEmail(email)) return next(createError(400, 'Invalid Email Address'))

        const findedUser = await User.findOne({ username })
        if (Boolean(findedUser)) return next(createError(400, 'Username already exist'))

        const hashedPassword = await bcrypt.hash(password, 12)

        if (username == process.env.SUPER_ADMIN_USERNAME)
            role = 'super_admin'
        else if (username == process.env.MANAGER_USERNAME)
            role = 'manager'
        else
            role = role || 'client'

        const newUser = await User.create({ firstName, lastName, username, email, phone, password: hashedPassword, city, role, project })
        res.status(200).json({ result: newUser, message: 'User created successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}


export const login = async (req, res, next) => {
    try {

        const { username, password: input_password } = req.body

        if (!username || !input_password) return next(createError(400, 'Make sure to provide all the fields'))

        const findedUser = await User.findOne({ username })
        if (!findedUser) return next(createError(400, 'Wrong Credentials - username'))

        const isPasswordCorrect = await bcrypt.compare(input_password, findedUser.password)
        if (!isPasswordCorrect) return next(createError(401, 'Wrong Credentials - password'))

        const token = jwt.sign({ _id: findedUser._id, role: findedUser.role }, process.env.JWT_SECRET)

        res.status(201).json({ result: { ...findedUser._doc, token }, message: 'User logged in successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}


export const logout = async (req, res, next) => {
    try {



    } catch (err) {
        next(createError(500, err.message))
    }
}