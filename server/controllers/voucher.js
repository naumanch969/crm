import Voucher from '../models/voucher.js'
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

export const createVoucher = async (req, res, next) => {
    try {

        const { } = req.body

        const newVoucher = await Voucher.create({})
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