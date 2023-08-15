import Cashbook from '../models/cashbook.js'
import { createError } from '../utils/error.js'

export const getCashbook = async (req, res, next) => {
    try {

        const { cashbookId } = req.params
        const findedCashbook = await Cashbook.findById(cashbookId)
        if (!findedCashbook) return next(createError(400, 'Cashbook not exist'))

        res.status(200).json({ result: findedCashbook, message: 'cashbook created successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}


export const getCashbooks = async (req, res, next) => {
    try {

        const { new: new_query, type } = req.query

        const findedCashbooks = new_query
            ?
            type
                ? await Cashbook.find({ type }).sort({ createdAt: -1 }).limit(10)
                : await Cashbook.find().sort({ createdAt: -1 }).limit(10)
            :
            type
                ? await Cashbook.find({ type })
                : await Cashbook.find()

        res.status(200).json({ result: findedCashbooks, message: 'cashbooks fetched successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}


export const createCashbook = async (req, res, next) => {
    try {

        const { customerName, paymentType, paymentDetail, AmountPaid, BranchNumber, type, } = req.body
        if (!customerName || !paymentType || !paymentDetail || !AmountPaid || !BranchNumber || !type)
            return next(createError(400, 'Make sure to provide all the fields'))

        const newCashbook = await Cashbook.create({ customerName, paymentType, paymentDetail, AmountPaid, BranchNumber, type })
        res.status(200).json({ result: newCashbook, message: 'cashbook created successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const deleteCashbook = async (req, res, next) => {
    try {

        const { cashbookId } = req.params
        const findedCashbook = await Cashbook.findById(cashbookId)
        if (!findedCashbook) return next(createError(400, 'Cashbook not exist'))

        const deletedCashbook = await Cashbook.findByIdAndDelete(cashbookId)
        res.status(200).json({ result: deletedCashbook, message: 'cashbook deleted successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const deleteWholeCollection = async (req, res, next) => {
    try {

        const result = await Cashbook.deleteMany()
        res.status(200).json({ result, message: 'Cashbook collection deleted successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}