import * as api from '../api'
import { start, end, error, getVoucherReducer, getVouchersReducer, createVoucherReducer, updateVoucherReducer, deleteVoucherReducer, } from '../reducer/voucher.js'

export const getVoucher = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getVoucher()
        dispatch(getVoucherReducer(data.result))
        dispatch(end())
    } catch (err) {
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
        dispatch(error(err.message))
    }
}
export const createVoucher = (voucherData, setOpen) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.createVoucher(voucherData)
        dispatch(createVoucherReducer(data.result))
        setOpen(false)
        dispatch(end())
    } catch (err) {
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
        dispatch(error(err.message))
    }
}