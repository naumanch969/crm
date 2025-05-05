import toast from 'react-hot-toast'
import * as api from '../api'
import { start, end, error, getApprovalReducer, getApprovalsReducer, createRequestApprovalReducer, rejectRequestApprovalReducer, createVoucherApprovalReducer, acceptVoucherApprovalReducer, rejectVoucherApprovalReducer, createReceiptApprovalReducer, createRefundApprovalReducer, rejectRefundApprovalReducer, deleteApprovalReducer, } from '../reducer/approval'
import { createNotificationReducer } from '../reducer/notification'
import { updateLead } from './lead'


export const getApproval = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getApproval()
        dispatch(getApprovalReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const getApprovals = (type) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getApprovals(type)
        dispatch(getApprovalsReducer({ result: data.result, type }))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const createVoucherApproval = (data) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.createVoucherApproval(data)
        dispatch(createVoucherApprovalReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const acceptVoucherApproval = (approvalId, password, setOpen) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.acceptVoucherApproval(approvalId, password)
        dispatch(acceptVoucherApprovalReducer(approvalId))
        setOpen(false)
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const rejectVoucherApproval = (approvalId, password, setOpen) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.rejectVoucherApproval(approvalId, password)
        dispatch(rejectVoucherApprovalReducer(approvalId))
        setOpen(false)
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const createReceiptApproval = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.createReceiptApproval()
        dispatch(createReceiptApprovalReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const createRefundApproval = (approvalData, navigate) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.createRefundApproval(approvalData)
        dispatch(createRefundApprovalReducer(data.result))
        if (data.notification) {
            dispatch(createNotificationReducer(data.notification))
        }
        navigate(`/leads`)
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const rejectRefundApproval = (approvalId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.deleteApproval(approvalId)
        dispatch(rejectRefundApprovalReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const deleteApproval = (approvalId, type) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.deleteApproval(approvalId)
        dispatch(deleteApprovalReducer({ type, result: data.result }))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}