import Refund from '../models/refund.js'
import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import Cashbook from '../models/cashbook.js'
import Notification from '../models/notification.js'
import { createError } from '../utils/error.js'


export const getRefund = async (req, res, next) => {
    try {

        const { refundId } = req.params
        const findedRefund = await Refund.findById(refundId)
        if (!findedRefund) return next(createError(401, 'Refund not exist'))

        res.status(200).json({ result: findedRefund, message: 'refund fetched seccessfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const getRefunds = async (req, res, next) => {
    try {

        // const refunds = await Refund.find({ status: { $in: ['underProcess'] } })
        const refunds = await Refund.find()

        res.status(200).json({ result: refunds, message: 'refunds fetched seccessfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const getLeadRefunds = async (req, res, next) => {
    try {

        const { leadId } = req.query
        const refunds = await Refund.find({ leadId })

        res.status(200).json({ result: refunds, message: 'refunds fetched seccessfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const createRefund = async (req, res, next) => {
    try {

        const { branch, amount, clientName, CNIC, phone, reason, leadId } = req.body
        if (!amount || !branch || !clientName || !phone || !reason || !leadId) return next(createError(400, 'Make sure to provide all the fields'))

        const notification = await Notification.create({
            title: 'Refund Request',
            type: 'refund-approval',
            description: `${clientName} is requesting for refund.`,
            data: { branch, amount, clientName, CNIC, phone, reason, leadId },
        })

        const newRefund = await Refund.create({ branch, amount, clientName, CNIC, phone, reason, leadId, notificationId: notification._id })
        res.status(200).json({ result: newRefund, message: 'Refund created successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const updateRefund = async (req, res, next) => {
    try {

        const { refundId } = req.params
        const findedRefund = await Refund.findById(refundId)
        if (!findedRefund) return next(createError(400, 'Refund not exist'))

        const updatedRefund = await Refund.findByIdAndUpdate(refundId, { $set: req.body }, { new: true })
        res.status(200).json({ result: updatedRefund, message: 'Refund updated successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}
export const acceptRefund = async (req, res, next) => {
    try {

        const { refundId } = req.params
        const { password, ...cashbookData } = req.body

        const findedRefund = await Refund.findById(refundId)
        if (!findedRefund) return next(createError(400, 'Refund not exist'))

        const admin = await User.findById(req.user._id)
        const inputPassword = password;
        const savedPassword = admin?.password
        const isPasswordCorrect = await bcrypt.compare(inputPassword, savedPassword)
        if (!isPasswordCorrect) return next(createError(401, 'Incorrect Password'))


        await Cashbook.create(cashbookData)

        const updatedRefund = await Refund.findByIdAndUpdate(refundId, { $set: { status: 'accepted' } }, { new: true })
        await Notification.findByIdAndDelete(cashbookData.notificationId)
        res.status(200).json({ result: updatedRefund, message: 'Refund accepted successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}
export const rejectRefund = async (req, res, next) => {
    try {

        const { refundId } = req.params
        const { password } = req.body
        const findedRefund = await Refund.findById(refundId)
        if (!findedRefund) return next(createError(400, 'Refund not exist'))

        const admin = await User.findById(req.user._id)
        const inputPassword = password;
        const savedPassword = admin?.password
        const isPasswordCorrect = await bcrypt.compare(inputPassword, savedPassword)
        if (!isPasswordCorrect) return next(createError(401, 'Incorrect Password'))

        const updatedRefund = await Refund.findByIdAndUpdate(refundId, { $set: { status: 'rejected' } }, { new: true })
        await Notification.findByIdAndDelete(cashbookData.notificationId)
        res.status(200).json({ result: updatedRefund, message: 'Refund rejected successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const deleteRefund = async (req, res, next) => {
    try {

        const { refundId } = req.params
        const findedRefund = await Refund.findById(refundId)
        if (!findedRefund) return next(createError(400, 'Refund not exist'))

        const deletedRefund = await Refund.findByIdAndDelete(refundId)
        res.status(200).json({ result: deletedRefund, message: 'Refund deleted successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}


export const deleteWholeCollection = async (req, res, next) => {
    try {

        const result = await Refund.deleteMany()
        res.status(200).json({ result, message: 'Refund collection deleted successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}
