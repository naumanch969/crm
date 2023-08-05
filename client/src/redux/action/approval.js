import * as api from '../api'
import { start, end, error, getApprovalReducer, getApprovalsReducer, createRequestApprovalReducer, rejectRequestApprovalReducer, createVoucherApprovalReducer, createReceiptApprovalReducer, createRefundApprovalReducer, deleteApprovalReducer, } from '../reducer/approval'


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
        console.log('userData', userData)
        const { data } = await api.createRequestApproval(userData)  // userData = { firstName, lastName, username, phone, email, password}
        console.log('createRequestApproval data', data.result)
        dispatch(createRequestApprovalReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const rejectRequestApproval = (email) => async (dispatch) => {
    try {
        dispatch(start())
        console.log('userData', userData)
        const { data } = await api.rejectRequestApproval(email)  // userData = { firstName, lastName, username, phone, email, password}
        console.log('rejectRequestApproval data', data.result)
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
export const createRefundApproval = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.createRefundApproval()
        dispatch(createRefundApprovalReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const deleteApproval = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.deleteApproval()
        dispatch(deleteApprovalReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}