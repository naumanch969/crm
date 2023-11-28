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

        const findedSale = await Sale.find()
        res.status(200).json({ result: findedSale, message: 'sales fetched successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}
export const getEmployeeSales = async (req, res, next) => {
    try {

        let allSales = await Sale.find({})
        const employeeLeads = await Lead.find({ allocatedTo: { $in: req.user?._id }, isArchived: false })
            .populate('client').populate('allocatedTo')
            .exec();

        allSales = allSales.filter((sale) => {
            return employeeLeads.findIndex(lead => lead._id.toString() == sale.leadId.toString()) != -1
        })

        res.status(200).json({ result: allSales, message: 'sales fetched successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}
export const getLeadSales = async (req, res, next) => {
    try {

        const { leadId } = req.query
        const findedLeads = await Sale.find({ leadId }).populate('leadId').exec();
        res.status(200).json({ result: findedLeads, message: 'Leads fetched successfully', success: true });
    } catch (err) {
        next(createError(500, err.message));
    }
};
export const createSale = async (req, res, next) => {
    try {

        const { leadId, clientName, net, received, staff, top } = req.body
        if (!clientName || !net || !received || !staff || !top) return next(createError(400, 'Make sure to provide all the fields'))

        let newSale;
        if (leadId) {
            newSale = await Sale.create({ clientName, net, received, staff, top, leadId })
        }
        else {
            newSale = await Sale.create({ clientName, net, received, staff, top })
        }

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

        const updatedSale = await Sale.findByIdAndUpdate(saleId, { $set: req.body }, { new: true })
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