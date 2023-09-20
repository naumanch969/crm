import * as api from '../api'
import { start, end, error, getFollowUpReducer, getFollowUpsReducer, createFollowUpReducer, deleteFollowUpReducer, } from '../reducer/followUp'

export const getFollowUp = (followUpId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getFollowUp(followUpId)
        dispatch(getFollowUpReducer(data.result))
        dispatch(end())
    } catch (err) {
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
        dispatch(error(err.message))
    }
}