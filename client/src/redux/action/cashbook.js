import * as api from '../api'
import { start, end, error, getCashbookReducer, getCashbooksReducer, createCashbookReducer, deleteCashbookReducer, } from '../reducer/cashbook'


export const getCashbook = (cashbookId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getCashbook(cashbookId)
        dispatch(getCashbookReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const getCashbooks = (type) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getCashbooks(type)
        dispatch(getCashbooksReducer({ type, result: data.result }))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const createCashbook = (cashbookData) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.createCashbook(cashbookData)
        dispatch(createCashbookReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const deleteCashbook = (cashbookId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.deleteCashbook(cashbookId)
        dispatch(deleteCashbookReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}