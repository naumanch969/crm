import Deduction from "../models/deductions.js";
import { createError } from '../utils/error.js'

export const getDeduction = async (req, res, next) => {
    try {
        const { deductionId } = req.params
        const deduction = await Deduction.findById(deductionId)
        res.status(200).json({ result: deduction, message: 'deduction fetched successfully', success: true })
    } catch (err) {
        next(createError(500, err.message))
    }
}

export const getDeductions = async (req, res, next) => {
    try {
        const deductions = await Deduction.find();
        res.status(200).json({ result: deductions, message: 'deductions fetched successfully', success: true })
    } catch (err) {
        next(createError(500, err.message))
    }
}

export const createDeduction = async (req, res, next) => {
    try {
        const { lateArrivals, halfDays, dayOffs } = req.body
        const newDeduction = new Deduction({ lateArrivals, halfDays, dayOffs })
        await newDeduction.save()
        res.status(200).json({ result: newDeduction, message: 'deduction created successfully', success: true })
    } catch (err) {
        next(createError(500, err.message))
    }
}

export const updateDeduction = async (req, res, next) => {
    try {
        const { deductionId } = req.params
        const { lateArrivals, halfDays, dayOffs } = req.body
        const updatedDeduction = await Deduction.findByIdAndUpdate(deductionId, { lateArrivals, halfDays, dayOffs }, { new: true })
        res.status(200).json({ result: updatedDeduction, message: 'deduction updated successfully', success: true })
    } catch (err) {
        next(createError(500, err.message))
    }
}

export const deleteDeduction = async (req, res, next) => {
    try {
        const { deductionId } = req.params
        const deletedDeduction = await Deduction.findByIdAndDelete(deductionId)
        res.status(200).json({ result: deletedDeduction, message: 'deduction deleted successfully', success: true })
    } catch (err) {
        next(createError(500, err.message))
    }
}
