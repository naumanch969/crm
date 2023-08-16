import * as api from '../api'
import { start, end, error, getLeadsReducer, getLeadReducer,getLeadsStatReducer, createLeadReducer, updateLeadReducer, deleteLeadReducer, } from '../reducer/lead'


export const getLeads = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getLeads()
        dispatch(getLeadsReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const getLead = (leadId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getLead(leadId)
        dispatch(getLeadReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const getLeadsStat = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getLeadsStat()
        dispatch(getLeadsStatReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const createLead = (leadData, type, navigate) => async (dispatch) => {
    try {
        dispatch(start())

        const { data } = type == 'onsite'
            ? await api.createOnsiteLead(leadData)
            : await api.createOnlineLead(leadData)

        dispatch(createLeadReducer(data.result))
        navigate('/leads')

        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const updateLead = (leadId, leadData) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.updateLead(leadId, leadData)
        dispatch(updateLeadReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const deleteLead = (leadId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.deleteLead(leadId)
        dispatch(deleteLeadReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}