import Notification from '../models/notification.js'
import { createError } from '../utils/error.js'
import validator from 'validator'

export const getNotification = async (req, res, next) => {
    try {

        const { notificationId } = req.params
        const findedNotification = await Notification.findById(notificationId)
        if (!findedNotification) return next(createError(401, 'Notification not exist'))

        res.status(200).json({ result: findedNotification, message: 'notification fetched seccessfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const getNotifications = async (req, res, next) => {
    try {

        const notifications = await Notification.find()

        res.status(200).json({ result: notifications, message: 'notifications fetched seccessfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const createRequestNotification = async (req, res, next) => {
    try {

        const { firstName, lastName, username, phone, email, password } = req.body
        if (!firstName || !lastName || !username || !email || !password) return next(createError(400, 'Make sure to provide all the fields'))
        if (!validator.isEmail(email)) return next(createError(400, 'Invalid Email Address'))

        const isAlreadySend = await Notification.findOne({ 'data.email': email })
        if (Boolean(isAlreadySend)) return res.status(201).json({ message: 'Notification with this email already created', success: true })

        const notification = await Notification.create({
            title: 'Registeration Approval',
            type: 'registeration-approval',
            description: 'Need approval for the registeration',
            data: { firstName, lastName, username, phone, email, password }
        })


        res.status(200).json({ result: notification, message: 'Notification created successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const deleteNotification = async (req, res, next) => {
    try {

        const { notificationId } = req.params
        const findedNotification = await Notification.findById(notificationId)
        if (!findedNotification) return next(createError(400, 'Notification not exist'))

        const deletedNotification = await Notification.findByIdAndDelete(notificationId)
        res.status(200).json({ result: deletedNotification, message: 'Notification deleted successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))

    }
}


export const deleteWholeCollection = async (req, res, next) => {
    try {

        const result = await Notification.deleteMany()
        res.status(200).json({ result, message: 'Notification collection deleted successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}
