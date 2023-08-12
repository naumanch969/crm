import User from '../models/user.js'
import Notification from '../models/notification.js'
import { createError } from '../utils/error.js'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'


export const register = async (req, res, next) => {
    try {

        const { firstName, lastName, username, phone, email, password } = req.body

        if (!firstName || !lastName || !username || !email || !phone || !password) return next(createError(400, 'Make sure to provide all the fields'))
        if (!validator.isEmail(email)) return next(createError(400, 'Invalid Email Address'))

        const findedUser = await User.findOne({ email })
        if (Boolean(findedUser)) return next(createError(400, 'Email already exist'))

        const hashedPassword = await bcrypt.hash(password, 12)

        // const transporter = nodemailer.createTransport({
        //     service: 'Gmail',
        //     auth: { user: process.env.SENDER_EMAIL, pass: process.env.SENDER_EMAIL_PASSWORD }
        // });
        // const info = await transporter.sendMail({
        //     from: process.env.SENDER_EMAIL,
        //     to: email,
        //     subject: "Registeration Successful",
        //     html: "<b>Hello world?</b>",
        // });
        // transporter.sendMail(info)

        const newUser = await User.create({ firstName, lastName, username, email, phone, password: hashedPassword })
        res.status(200).json({ result: newUser, message: 'User created successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}


export const login = async (req, res, next) => {
    try {

        const { email, password: input_password } = req.body

        if (!email || !input_password) return next(createError(400, 'Make sure to provide all the fields'))
        if (!validator.isEmail(email)) return next(createError(400, 'Invalid Email Address'))

        const findedUser = await User.findOne({ email })
        if (!findedUser) return next(createError(400, 'Wrong Credentials - email'))

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