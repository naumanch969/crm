import Event from '../models/event.js'
import { createError } from '../utils/error.js'


export const getEvent = async (req, res, next) => {
    try {

        const { eventId } = req.params
        const findedEvent = await Event.findById(eventId).populate('userId').exec()
        if (!findedEvent) return next(createError(401, 'Event not exist'))

        res.status(200).json({ result: findedEvent, message: 'event fetched seccessfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const getEvents = async (req, res, next) => {
    try {

        const events = await Event.find().populate('userId').exec()

        res.status(200).json({ result: events, message: 'events fetched seccessfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const getEmployeeEvents = async (req, res, next) => {
    try {
        const events = await Event.find({ userId: req.user._id }).populate('userId').exec()
        res.status(200).json({ result: events, message: 'events fetched seccessfully', success: true })
    } catch (err) {
        next(createError(500, err.message))
    }
}

export const createEvent = async (req, res, next) => {
    try {

        const { title, description, start, end } = req.body
        if (!title || !description || !start || !end) return next(createError(400, 'Make sure to provide all the fields'))

        const newEvent = await Event.create({ title, description, userId: req.user._id, start: new Date(start), end: new Date(end) })
        res.status(200).json({ result: newEvent, message: 'Event created successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const updateEvent = async (req, res, next) => {
    try {

        const { eventId } = req.params
        const findedEvent = await Event.findById(eventId)
        if (!Boolean(findedEvent)) return next(createError(401, 'Event not exist'))

        const udpatedEvent = await Event.findByIdAndUpdate(eventId, { $set: req.body }, { new: true }).populate('userId').exec()
        res.status(200).json({ result: udpatedEvent, message: 'event udpated successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const deleteEvent = async (req, res, next) => {
    try {

        const { eventId } = req.params
        const findedEvent = await Event.findById(eventId)
        if (!findedEvent) return next(createError(400, 'Event not exist'))

        const deletedEvent = await Event.findByIdAndDelete(eventId)
        res.status(200).json({ result: deletedEvent, message: 'Event deleted successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}


export const deleteWholeCollection = async (req, res, next) => {
    try {

        const result = await Event.deleteMany()
        res.status(200).json({ result, message: 'Event collection deleted successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}
