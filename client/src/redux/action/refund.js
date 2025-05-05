import toast from 'react-hot-toast'
import * as api from '../api'
import { start, end, error, getRefundReducer, getRefundsReducer, createRefundReducer, updateRefundReducer, deleteRefundReducer, } from '../reducer/refund'

export const getRefund = (refundId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getRefund(refundId)
        dispatch(getRefundReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const getRefunds = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getRefunds()
        dispatch(getRefundsReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const getLeadRefunds = (leadId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getLeadRefunds(leadId)
        dispatch(getRefundsReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const createRefund = (refundData, setOpen) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.createRefund(refundData)
        dispatch(createRefundReducer(data.result))
        setOpen(false)
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const updateRefund = (refundId, refundData) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.updateRefund(refundId, refundData)
        dispatch(updateRefundReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const acceptRefund = (refundId, cashbookData) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.acceptRefund(refundId, cashbookData)
        dispatch(updateRefundReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const rejectRefund = (refundId, password) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.rejectRefund(refundId, password)
        dispatch(updateRefundReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const deleteRefund = (refundId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.deleteRefund(refundId)
        dispatch(deleteRefundReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}