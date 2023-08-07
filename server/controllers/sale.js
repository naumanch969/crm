import Sale from '../models/sale.js'
import { createError } from '../utils/error.js'


export const getSale = async (req, res, next) => {
    try {

        const { saleId } = req.params
        const findedSale = await Sale.findById(saleId)
        if (!findedSale) return next(createError(400, 'Sale not exist'))

        res.status(200).json({ result: findedSale, message: 'sale created successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const getSales = async (req, res, next) => {
    try {

        const { new: new_query } = req.query

        const findedSale = new_query
            ? await Sale.find().sort({ createdAt: -1 }).limit(10)
            : await Sale.find()
        res.status(200).json({ result: findedSale, message: 'sales fetched successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const createSale = async (req, res, next) => {
    try {

        const { leadId, supplierName, net, received, branch, psf, fop, staff, invoiceNumber } = req.body
        if (!leadId || !supplierName || !net || !received || !branch || !psf || !fop || !staff || !invoiceNumber)
            return next(createError(400, 'Make sure to provide all the fields'))

        const newSale = await Sale.create({ leadId, supplierName, net, received, branch, psf, fop, staff, invoiceNumber })
        res.status(200).json({ result: newSale, message: 'sale created successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const updateSale = async (req, res, next) => {
    try {

        const { saleId } = req.params
        const findedSale = await Sale.findById(saleId)
        if (!findedSale) return next(createError(400, 'Sale not exist'))
        console.log(saleId)
        console.log(req.body)

        const updatedSale = await Sale.findByIdAndUpdate(saleId, { $set: req.body }, { new: true })
        console.log(updatedSale)
        res.status(200).json({ result: updatedSale, message: 'sale updated successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const deleteSale = async (req, res, next) => {
    try {

        const { saleId } = req.params
        const findedSale = await Sale.findById(saleId)
        if (!findedSale) return next(createError(400, 'Sale not exist'))

        const deletedSale = await Sale.findByIdAndDelete(saleId)
        res.status(200).json({ result: deletedSale, message: 'sale deleted successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const deleteWholeCollection = async (req, res, next) => {
    try {

        const result = await Sale.deleteMany()
        res.status(200).json({ result, message: 'Sale collection deleted successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}