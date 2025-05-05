import toast from 'react-hot-toast'
import * as api from '../api'
import { start, end, error, getSaleReducer, getSalesReducer, createSaleReducer, updateSaleReducer, deleteSaleReducer, } from '../reducer/sale'


export const getSale = (saleId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getSale(saleId)
        dispatch(getSaleReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const getSales = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getSales()
        dispatch(getSalesReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const getEmployeeSales = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getSales()
        dispatch(getSalesReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const getLeadSales = (leadId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getLeadSales(leadId)
        dispatch(getSalesReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const createSale = (saleData, setOpen) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.createSale(saleData)
        dispatch(createSaleReducer(data.result))
        setOpen(false)
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const updateSale = (saleId, saleData) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.updateSale(saleId, saleData)
        dispatch(updateSaleReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const deleteSale = (saleId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.deleteSale(saleId)
        dispatch(deleteSaleReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}