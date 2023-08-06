import Lead from '../models/lead.js'
import { createError } from '../utils/error.js'


export const getLead = async (req, res, next) => {
    try {

        const { leadId } = req.params
        const findedLead = await Lead.findById(leadId)
        if (!findedLead) return next(createError(400, 'Lead not exist'))

        res.status(200).json({ result: findedLead, message: 'lead created successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const getLeads = async (req, res, next) => {
    try {

        const { new: new_query } = req.query

        const findedLead = new_query ? await Lead.find().sort({ createdAt: -1 }).limit(10) : await Lead.find()
        res.status(200).json({ result: findedLead, message: 'leads fetched successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const createLead = async (req, res, next) => {
    try {

        const { ...data } = req.body

        const newLead = await Lead.create(data)
        res.status(200).json({ result: newLead, message: 'lead created successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const updateLead = async (req, res, next) => {
    try {

        const { leadId } = req.params
        const findedLead = await Lead.findById(leadId)
        if (!findedLead) return next(createError(400, 'Lead not exist'))

        const updatedLead = await Lead.findByIdAndUpdate(leadId, { $set: req.body }, { new: true })
        res.status(200).json({ result: updatedLead, message: 'lead updated successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const deleteLead = async (req, res, next) => {
    try {

        const { leadId } = req.params
        const findedLead = await Lead.findById(leadId)
        if (!findedLead) return next(createError(400, 'Lead not exist'))

        const deletedLead = await Lead.findByIdAndDelete(leadId)
        res.status(200).json({ result: deletedLead, message: 'lead deleted successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const deleteWholeCollection = async (req, res, next) => {
    try {

        const result = await Lead.deleteMany()
        res.status(200).json({ result, message: 'Lead collection deleted successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}