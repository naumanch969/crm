import * as api from '../api'
import { start, end, error, getApprovalReducer, getApprovalsReducer, createRequestApprovalReducer, rejectRequestApprovalReducer, createVoucherApprovalReducer, createReceiptApprovalReducer, createRefundApprovalReducer, rejectRefundApprovalReducer, deleteApprovalReducer, } from '../reducer/approval'
import { createNotificationReducer } from '../reducer/notification'
import { updateLead } from './lead'


export const getApproval = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getApproval()
        dispatch(getApprovalReducer(data.result))
        dispatch(end())
    } catch (err) {
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
        dispatch(error(err.message))
    }
}
export const createRequestApproval = (userData) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.createRequestApproval(userData)  // userData = { firstName, lastName, username, phone, email, password}
        dispatch(createRequestApprovalReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const rejectRequestApproval = (email) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.rejectRequestApproval(email)  // userData = { firstName, lastName, username, phone, email, password}
        dispatch(rejectRequestApprovalReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const createVoucherApproval = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.createVoucherApproval()
        dispatch(createVoucherApprovalReducer(data.result))
        dispatch(end())
    } catch (err) {
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
        dispatch(error(err.message))
    }
}
export const rejectRefundApproval = (approvalId, password, leadId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.deleteApproval(approvalId, password)

        if (password && data.result) {    // in case of refund, after successful rejectRefundApproval, we have to delete that approval + we need to update the status of lead
            dispatch(updateLead(leadId, { isAppliedForRefund: false }))
        }

        dispatch(rejectRefundApprovalReducer(data.result))
        dispatch(end())
    } catch (err) {
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
        dispatch(error(err.message))
    }
}