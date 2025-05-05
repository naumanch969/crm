import toast from 'react-hot-toast'
import * as api from '../api'
import { createVoucherApprovalReducer } from '../reducer/approval'
import { createNotificationReducer } from '../reducer/notification'
import { start, end, error, getVoucherReducer, getVouchersReducer, createVoucherReducer, updateVoucherReducer, deleteVoucherReducer, } from '../reducer/voucher.js'

export const getVoucher = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getVoucher()
        dispatch(getVoucherReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const getVouchers = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getVouchers()
        dispatch(getVouchersReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const getEmployeeVouchers = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getEmployeeVouchers()
        dispatch(getVouchersReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const createVoucher = (voucherData, setOpen, projects) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.createVoucher(voucherData)
        dispatch(createVoucherReducer(data.result))
        const project = projects.filter(p => String(p._id) == String(voucherData.project))
        const { data: approvalData } = await api.createVoucherApproval({ ...data.result, project: project[0] })
        dispatch(createVoucherApprovalReducer(approvalData.result))
        if (approvalData.notification) {
            dispatch(createNotificationReducer(approvalData.notification))
        }
        setOpen(false)
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const deleteVoucher = (voucherId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.deleteVoucher(voucherId)
        dispatch(deleteVoucherReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}