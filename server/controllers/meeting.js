import Meeting from '../models/meeting.js'
import { createError } from '../utils/error.js'


export const getMeeting = async (req, res, next) => {
    try {

        const { meetingId } = req.params
        const findedMeeting = await Meeting.findById(meetingId)
        if (!findedMeeting) return next(createError(401, 'Meeting not exist'))

        res.status(200).json({ result: findedMeeting, message: 'meeting fetched seccessfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const getMeetings = async (req, res, next) => {
    try {

        const meetings = await Meeting.find()

        res.status(200).json({ result: meetings, message: 'meetings fetched seccessfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const createMeeting = async (req, res, next) => {
    try {

        const { title, description, from, to, dueDate } = req.body
        if (!title || !description || !from || !to || !dueDate) return next(createError(400, 'Make sure to provide all the fields'))

        const newMeeting = await Meeting.create({ title, description, from, to, dueDate })
        res.status(200).json({ result: newMeeting, message: 'Meeting created successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const updateMeeting = async (req, res, next) => {
    try {

        const { meetingId } = req.params
        const findedMeeting = await Meeting.findById(meetingId)
        if (!findedMeeting) return next(createError(400, 'Meeting not exist'))

        const updatedMeeting = await Meeting.findByIdAndUpdate(meetingId, { $set: req.body }, { new: true })
        res.status(200).json({ result: updatedMeeting, message: 'Meeting updated successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const deleteMeeting = async (req, res, next) => {
    try {

        const { meetingId } = req.params
        const findedMeeting = await Meeting.findById(meetingId)
        if (!findedMeeting) return next(createError(400, 'Meeting not exist'))

        const deletedMeeting = await Meeting.findByIdAndDelete(meetingId)
        res.status(200).json({ result: deletedMeeting, message: 'Meeting deleted successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}


export const deleteWholeCollection = async (req, res, next) => {
    try {

        const result = await Meeting.deleteMany()
        res.status(200).json({ result, message: 'Meeting collection deleted successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}
