import User from '../models/user.js'
import OTP from '../models/otp.js'
import Notification from '../models/notification.js'
import { createError } from '../utils/error.js'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import nodemailer from "nodemailer"
import otpGenerator from 'otp-generator'
import Lead from '../models/lead.js'

export const register = async (req, res, next) => {
    try {

        let { firstName, lastName, username, phone, email, password, city, role } = req.body

        if (!firstName || !lastName || !username || !phone || !password || !city) return next(createError(400, 'Make sure to provide all the fields'))
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

        const findedLead = await Lead.findOne({ clientPhone: phone })

        const newUser = await User.create({ firstName, lastName, username, email, phone, password: hashedPassword, city, role })

        if (findedLead) {
            await Lead.findByIdAndUpdate(findedLead._id, { $set: { client: newUser._id } }, { new: true });
        }

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


export const changePassword = async (req, res, next) => {
    try {

        const { oldPassword, newPassword } = req.body

        const findedUser = await User.findById(req.user._id)

        const isPasswordCorrect = await bcrypt.compare(oldPassword, findedUser.password)
        if (!isPasswordCorrect) return next(createError(401, 'Wrong Credentials'))

        const hashedPassword = await bcrypt.hash(newPassword, 12)

        const result = await User.findByIdAndUpdate(req.user._id, { password: hashedPassword }, { new: true })
        res.status(200).json({ result, message: 'Password Changed Successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}




export const sendForgetPasswordOTP = async (req, res) => {
    try {
        const { email } = req.body;

        const isEmailAlreadyReg = await User.findOne({ email })

        if (!email) return res.status(400).json({ message: 'email field is required', success: false })
        // in forget password route, user should be registered already
        if (!isEmailAlreadyReg) return res.status(400).json({ message: `No user exist with email ${email}`, success: false })
        if (!validator.isEmail(email)) return res.status(400).json({ message: `Please provide a valid email.`, success: false })

        const otp = otpGenerator.generate(6, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
        const hashedOTP = await bcrypt.hash(otp, 12)
        const newOTP = await OTP.create({ email, otp: hashedOTP, name: 'forget_password_otp' })


        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.SENDER_EMAIL,
                pass: process.env.SENDER_EMAIL_PASSWORD
            }
        });
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Verification',
            html: `<p>Your OTP code is ${otp}</p>`      // all data to be sent
        };
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) console.log('err in sending mail', err)
            else return null //console.log(info);
        });

        res.status(200).json({ result: newOTP, otp, message: 'forget_password_otp send successfully', success: true })

    }
    catch (error) {
        res.status(404).json({ message: 'error in sendForgetPasswordOTP - controllers/user.js', error, success: false })
    }
}

export const setNewPassword = async (req, res) => {
    try {

        const { email, password, otp } = req.body
        if (!email || !password || !otp) return res.status(400).json({ message: 'Make sure to provide all the fieds ( email, password, otp)', success: false })
        if (!validator.isEmail(email)) return res.status(400).json({ message: `Email pattern failed. Please provide a valid email.`, success: false })


        const findedUser = await User.findOne({ email })
        if (!findedUser) return res.status(400).json({ message: `user with email ${email} is not exist `, success: false })


        const otpHolder = await OTP.find({ email })
        if (otpHolder.length == 0) return res.status(400).json({ message: 'you have entered an expired otp', success: false })

        const forg_pass_otps = otpHolder.filter(otp => otp.name == 'forget_password_otp')         // otp may be sent multiple times to user. So there may be multiple otps with user email stored in dbs. But we need only last one.
        const findedOTP = forg_pass_otps[forg_pass_otps.length - 1]

        const plainOTP = otp
        const hashedOTP = findedOTP.otp

        const isValidOTP = await bcrypt.compare(plainOTP, hashedOTP)

        if (isValidOTP) {
            const hashedPassword = await bcrypt.hash(password, 12)
            const result = await User.findByIdAndUpdate(findedUser._id, { name: findedUser.name, email, password: hashedPassword }, { new: true })

            await OTP.deleteMany({ email: findedOTP.email })

            return res.status(200).json({ result, message: 'password changed successfully', success: true })
        }
        else {
            return res.status(200).json({ message: 'wrong otp', success: false })
        }

    }
    catch (error) {
        res.status(404).json({ message: 'error in changePassword - controllers/user.js', error, success: false })
    }
}