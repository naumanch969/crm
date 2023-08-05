import * as api from '../api'
import { start, end, error, getLeadsReducer, getLeadReducer, createLeadReducer, updateLeadReducer, deleteLeadReducer, } from '../reducer/lead'


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
export const createLead = (leadData) => async (dispatch) => {
    try {
        dispatch(start())
        console.log('leadData', leadData)
        const { data } = await api.createLead(leadData)
        dispatch(createLeadReducer(data.result))
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