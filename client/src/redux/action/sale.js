import * as api from '../api'
import { start, end, error, getSaleReducer, getSalesReducer, createSaleReducer, updateSaleReducer, deleteSaleReducer, } from '../reducer/sale'


export const getSale = (saleId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getSale(saleId)
        dispatch(getSaleReducer(data.result))
        dispatch(end())
    } catch (err) {
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
        dispatch(error(err.message))
    }
}
export const createSale = (saleData, navigate) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.createSale(saleData)
        dispatch(createSaleReducer(data.result))
        navigate('/sales')
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const updateSale = (saleId, saleData) => async (dispatch) => {
    try {
        dispatch(start())
        console.log(saleData)
        const { data } = await api.updateSale(saleId, saleData)
        console.log('data', data)
        dispatch(updateSaleReducer(data.result))
        dispatch(end())
    } catch (err) {
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
        dispatch(error(err.message))
    }
}