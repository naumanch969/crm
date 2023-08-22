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
export const createVoucher = (voucherData) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.createVoucher(voucherData)
        console.log('data', data.result)
        dispatch(createVoucherReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const deleteVoucher = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.deleteVoucher()
        dispatch(deleteVoucherReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}