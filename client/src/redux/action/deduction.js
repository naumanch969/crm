import toast from 'react-hot-toast'
import * as api from '../api'
import { start, end, error, createDeductionReducer, deleteDeductionReducer, getDeductionsReducer, updateDeductionReducer, getDeductionReducer } from '../reducer/deduction'

// Action Creators

export const getDeduction = (deductionId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getDeduction(deductionId)
        dispatch(getDeductionReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}

export const getDeductions = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getDeductions()
        dispatch(getDeductionsReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}

export const createDeduction = (deduction) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.createDeduction(deduction)
        dispatch(createDeductionReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}

export const updateDeduction = (deductionId, deduction) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.updateDeduction(deductionId, deduction)
        dispatch(updateDeductionReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}

export const deleteDeduction = (deductionId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.deleteDeduction(deductionId)
        dispatch(deleteDeductionReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}

