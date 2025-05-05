import toast from 'react-hot-toast'
import * as api from '../api'
import { start, end, error, getCashbookReducer, getCashbooksReducer, getSpecificDateCashbookReducer, getIncomeAndExpensesReducer, getPaymentsReducer, createCashbookReducer, deleteCashbookReducer, } from '../reducer/cashbook'


export const getCashbook = (cashbookId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getCashbook(cashbookId)
        dispatch(getCashbookReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const getCashbooks = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getCashbooks()
        dispatch(getCashbooksReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const getEmployeeCashbooks = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getEmployeeCashbooks()
        dispatch(getCashbooksReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const getLeadCashbooks = (leadId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getLeadCashbooks(leadId)
        dispatch(getCashbooksReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const getSpecificDateCashbook = (type) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getSpecificDateCashbook(type)
        dispatch(getSpecificDateCashbookReducer({ cashIn: data.result.cashIn, cashOut: data.result.cashOut }))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const getIncomeAndExpenses = (year) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getIncomeAndExpenses(year)
        dispatch(getIncomeAndExpensesReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const getPayments = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getPayments()
        dispatch(getPaymentsReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
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
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
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
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}