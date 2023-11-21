import Transript from '../models/transcript.js'
import { createError } from '../utils/error.js'

export const getTranscript = async (req, res, next) => {
    try{
        const { TransriptId } = req.params
        const findedTranscript =await Transript.findOne({ TransriptId })

        if(!findedTranscript) {
            return next(createError(400, 'Transcript not found'))
        }
        res.status(200).json({ result: findedTranscript, message: 'Transcript created successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const getTranscripts = async (req, res, next) => {
    try {

        const findedTranscript = await Transript.find()
        res.status(200).json({ result: findedTranscript, message: 'Transcripts fetched successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const createtranscript = async (req, res, next) => {
    try {

        const { employeeName, designation, phone, salaryMonth, totalSalary, lateArrivals, halfDays, dayOffs, netSalary, amountPerDayOff } = req.body
        
        const newTranscript = new Transript({  employeeName, designation, phone, salaryMonth, totalSalary, lateArrivals, halfDays, dayOffs, netSalary, amountPerDayOff  })
        await newTranscript.save()

        res.status(200).json({ result: newTranscript, message: 'Transcript created successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const updateTranscript = async (req, res, next) => {
    try {

        const { TransriptId } = req.params
        const { employeeName, designation, phone, salaryMonth, totalSalary, lateArrivals, halfDays, dayOffs, netSalary, amountPerDayOff } = req.body
        
        const updatedTranscript = await Transript.findByIdAndUpdate(TransriptId, { employeeName, designation, phone, salaryMonth, totalSalary, amountPerDayOff, lateArrivals, halfDays, dayOffs, netSalary }, { new: true })
        res.status(200).json({ result: updatedTranscript, message: 'Transcript updated successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const deleteTranscript = async (req, res, next) => {
    try {

        const { transcriptId } = req.params
        const findedTranscript = await Transript.findById(transcriptId)

        if (!findedTranscript) return next(createError(400, 'Transcript not Found'))

        const deletedLead = await Transript.findByIdAndDelete(transcriptId)

        res.status(200).json({ result: deletedLead, message: 'Transcript deleted successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

