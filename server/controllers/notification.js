import Notification from '../models/notification.js'
import Task from '../models/task.js'
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
        const oneDayAhead = new Date();
        oneDayAhead.setDate(oneDayAhead.getDate() + 1);

        // Find urgent tasks due within one day
        const urgentTasks = await Task.find({ dueDate: oneDayAhead });

        const taskNotifications = await Promise.all(
            urgentTasks.map(async (task) => {
                // Check if a notification already exists for this task
                const existingNotification = await Notification.findOne({
                    type: 'urgent-task',
                    'data._id': task._id,
                });

                if (!existingNotification) {
                    // Create a notification object with the required fields
                    const notification = new Notification({
                        title: 'Task Urgency',
                        description: 'A task is about to reach its due date.',
                        type: 'urgent-task',
                        data: task.toObject(),
                    });

                    await notification.save();
                    return notification.toObject();
                } else {
                    return existingNotification.toObject();
                }
            })
        );

        const notifications = await Notification.find()
        const allNotifications = [...notifications, ...taskNotifications]

        res.status(200).json({ message: 'Notification check completed.', result: allNotifications });
    } catch (err) {
        next(createError(500, err.message));
    }
};


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
