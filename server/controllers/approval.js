import Approval from '../models/approval.js'
import Lead from '../models/lead.js'
import Notification from '../models/notification.js'
import { createError } from '../utils/error.js'
import { sendMail } from '../utils/mail.js'
import validator from 'validator'


export const getApproval = async (req, res, next) => {
    try {

        const { approvalId } = req.params
        const findedApproval = await Approval.findById(approvalId)
        if (!findedApproval) return next(createError(401, 'Approval not exist'))

        res.status(200).json({ result: findedApproval, message: 'approval fetched seccessfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const getApprovals = async (req, res, next) => {
    try {

        const { type } = req.query

        const approvals = type ? await Approval.find({ type }) : await Approval.find()
        res.status(200).json({ result: approvals, message: 'approvals fetched seccessfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const createRequestApproval = async (req, res, next) => {
    try {

        const { firstName, lastName, username, phone, email, password } = req.body
        if (!firstName || !lastName || !username || !email || !password) return next(createError(400, 'Make sure to provide all the fields'))
        if (!validator.isEmail(email)) return next(createError(400, 'Invalid Email Address'))

        const findedApproval = await Approval.findOne({ 'data.email': { $exists: true }, 'data.email': email })
        if (Boolean(findedApproval)) return res.status(201).json({ result: findedApproval, message: 'Your registeration request has already been sent to the admin for approval', success: true })

        const result = await Approval.create({
            title: 'Registeration Approval',
            type: 'request',
            description: 'Need approval for the registeration',
            data: { firstName, lastName, username, phone, email, password }
        })

        await Notification.create({
            title: 'Registeration Approval',
            type: 'registeration-approval',
            description: 'Need approval for the registeration',
            data: { firstName, lastName, username, phone, email, password }
        })

        res.status(200).json({ result, message: 'Registeration request has been sent to the admin for approval', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}
export const rejectRequestApproval = async (req, res, next) => {
    try {
        const { email } = req.body

        sendMail(email, 'Registeration Rejected', 'Your registeration has been denied')

        res.status(200).json({ message: 'Refund request has been sent to the admin for approval', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}
export const createVoucherApproval = async (req, res, next) => {
    try {

        const { } = req.body

        const result = await Approval.create({
            title: 'Voucher Approval',
            type: 'voucher',
            description: 'Need approval for the voucher',
            data: {}
        })

        res.status(200).json({ result, message: 'Voucher approval request has been sent to the admin.', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const createReceiptApproval = async (req, res, next) => {
    try {

        const { } = req.body

        const result = await Approval.create({
            title: 'Receipt Approval',
            type: 'receipt',
            description: 'Need approval for the receipt',
            data: {}
        })


        res.status(200).json({ result, message: 'Receipt has been sent to the admin.', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const createRefundApproval = async (req, res, next) => {
    try {

        const { branch, issuingDate, amount, customerName, cnic, phone, leadId, reason } = req.body

        const result = await Approval.create({
            title: 'Refund Approval',
            type: 'refund',
            description: 'Need approval for the refund',
            data: { branch, issuingDate, amount, customerName, cnic, phone, leadId, reason }
        })

        await Lead.findByIdAndUpdate(leadId, { $set: { isAppliedForRefund: true } }, { new: true })

        res.status(200).json({ result, message: 'Refund request has been sent to the admin for approval', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}


export const deleteApproval = async (req, res, next) => {
    try {

        const { approvalId } = req.params
        const findedApproval = await Approval.findById(approvalId)
        if (!findedApproval) return next(createError(400, 'Approval not exist'))

        const deletedApproval = await Approval.findByIdAndDelete(approvalId)
        res.status(200).json({ result: deletedApproval, message: 'Approval deleted successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))

    }
}

export const deleteWholeCollection = async (req, res, next) => {
    try {

        const result = await Approval.deleteMany()
        res.status(200).json({ result, message: 'Approval collection deleted successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}