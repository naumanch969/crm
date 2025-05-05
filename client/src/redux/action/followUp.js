import toast from 'react-hot-toast'
import * as api from '../api'
import { start, end, error, getFollowUpReducer, getFollowUpsReducer, getFollowUpsStatsReducer, createFollowUpReducer, deleteFollowUpReducer, } from '../reducer/followUp'

export const getFollowUp = (followUpId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getFollowUp(followUpId)
        dispatch(getFollowUpReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const getFollowUps = (leadId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getFollowUps(leadId)
        dispatch(getFollowUpsReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const getEmployeeFollowUps = (leadId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getEmployeeFollowUps(leadId)
        dispatch(getFollowUpsReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const getFollowUpsStats = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getFollowUpsStats()
        dispatch(getFollowUpsStatsReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const getEmployeeFollowUpsStats = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getEmployeeFollowUpsStats()
        dispatch(getFollowUpsStatsReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const createFollowUp = (followUpData) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.createFollowUp(followUpData)
        dispatch(createFollowUpReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const deleteFollowUp = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.deleteFollowUp()
        dispatch(deleteFollowUpReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}