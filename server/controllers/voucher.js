import Voucher from '../models/voucher.js'
import Lead from '../models/lead.js'
import { createError } from '../utils/error.js'

export const getVoucher = async (req, res, next) => {
    try {

        const { voucherId } = req.params
        const findedVoucher = await Voucher.findById(voucherId)
        if (!findedVoucher) return next(createError(400, 'Voucher not exist'))

        res.status(200).json({ result: findedVoucher, message: 'voucher created successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const getVouchers = async (req, res, next) => {
    try {

        const findedVouchers = await Voucher.find()
        res.status(200).json({ result: findedVouchers, message: 'vouchers fetched successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const getEmployeeVouchers = async (req, res, next) => {
    try {
        const findedVouchers = await Voucher.find({ allocatedTo: req.user?._id })
        res.status(200).json({ result: findedVouchers, message: 'Vouchers fetched successfully', success: true });
    } catch (err) {
        next(createError(500, err.message));
    }
}
export const createVoucher = async (req, res, next) => {
    try {

        const { branch, propertyType, area, project, issuingDate, dueDate, clientName, CNIC, phone, type, total, paid, } = req.body
        
        const newVoucher = await Voucher.create({ branch, propertyType, area, project, issuingDate, dueDate, clientName, CNIC, phone, type, total, paid, remained: total - paid, })
        res.status(200).json({ result: newVoucher, message: 'voucher created successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const updateVoucher = async (req, res, next) => {
    try {

        const { branch, issuingDate, dueDate, clientName, CNIC, phone, type, total, paid, remained, } = req.body

        const newVoucher = await Voucher.create({ branch, issuingDate, dueDate, clientName, CNIC, phone, type, total, paid, remained, })
        res.status(200).json({ result: newVoucher, message: 'voucher created successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const deleteVoucher = async (req, res, next) => {
    try {

        const { voucherId } = req.params
        const findedVoucher = await Voucher.findById(voucherId)
        if (!findedVoucher) return next(createError(400, 'Voucher not exist'))

        const deletedVoucher = await Voucher.findByIdAndDelete(voucherId)
        res.status(200).json({ result: deletedVoucher, message: 'voucher deleted successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const deleteWholeCollection = async (req, res, next) => {
    try {

        const result = await Voucher.deleteMany()
        res.status(200).json({ result, message: 'Voucher collection deleted successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}