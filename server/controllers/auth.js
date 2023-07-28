import User from '../models/user.js'
import Notification from '../models/notification.js'
import { createError } from '../utils/error.js'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req, res, next) => {
    try {

        const { firstName, lastName, username, phone, email, password } = req.body
        if (!firstName || !lastName || !username || !email || !password) return createError(400, 'Make sure to provide all the fields')
        if (!validator.isEmail(email)) return createError(400, 'Invalid Email Address')

        const isAlreadySend = await Notification.findOne({ 'data.email': email })
        if (Boolean(isAlreadySend)) return res.status(201).json({ message: 'Your registeration request has already been sent to the admin for approval', success: true })

        await Notification.create({
            title: 'Registeration Approval',
            type: 'registeration-approval',
            description: 'Need approval for the registeration',
            data: { firstName, lastName, username, phone, email, password }
        })


        res.status(200).json({ message: 'Registeration request has been sent to the admin for approval', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const registerSuccess = async (req, res, next) => {
    try {

        const { firstName, lastName, username, phone, email, password } = req.body
        console.log(firstName, lastName, username, phone, email, password)
        if (!firstName || !lastName || !username || !email || !phone || !password) return createError(400, 'Make sure to provide all the fields')
        if (!validator.isEmail(email)) return createError(400, 'Invalid Email Address')

        const hashedPassword = await bcrypt.hash(password, 12)

        const newUser = await User.create({ firstName, lastName, username, email, phone, password: hashedPassword })
        res.status(200).json({ result: newUser, message: 'User created successfully', success: true })
        console.log('amaze')
        // to do
        // send an registeration approved email to the user

    } catch (err) {
        next(createError(500, err.message))

    }
}


export const login = async (req, res, next) => {
    try {

        const { email, password: input_password } = req.body
        if (!email || !input_password) return createError(400, 'Make sure to provide all the fields')
        if (!validator.isEmail(email)) return createError(400, 'Invalid Email Address')

        const findedUser = await User.findOne({ email })
        if (!findedUser) return createError(400, 'Wrong Credentials - email')

        const isPasswordCorrect = await bcrypt.compare(input_password, findedUser.password)
        if (!isPasswordCorrect) return createError(401, 'Wrong Credentials - password')

        const token = await jwt.sign({ _id: findedUser._id, role: findedUser.role }, process.env.JWT_SECRET)

        res
            .cookie('authtoken', token, { httpOnly: true })
            .status(201)
            .json({ result: findedUser, message: 'User logged in successfully', success: true })


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