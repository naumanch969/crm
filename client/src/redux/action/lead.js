import { useSelector } from 'react-redux'
import * as api from '../api'
import { start, end, error, getLeadsReducer, getLeadReducer, getLeadsStatReducer, createLeadReducer, updateLeadReducer, deleteLeadReducer, } from '../reducer/lead'
import toast from 'react-hot-toast'


export const getLeads = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getLeads()
        dispatch(getLeadsReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}

export const getEmployeeLeads = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getEmployeeLeads()
        dispatch(getLeadsReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
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
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const getLeadByPhone = (phone) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getLeadByPhone(phone)
        dispatch(getLeadsReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const getLeadsStat = (type) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getLeadsStat(type)
        dispatch(getLeadsStatReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const searchLead = (searchTerm) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.searchLead(searchTerm)
        dispatch(getLeadsReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const filterLead = (filters) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.filterLead(filters)
        dispatch(getLeadsReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const createLead = (leadData, navigate) => async (dispatch) => {
    try {
        dispatch(start())

        const { data } = await api.createLead(leadData)

        dispatch(createLeadReducer(data.result))
        navigate('/leads')

        const { loggedUser } = useSelector(state => state.user)
        if (loggedUser.role == 'employee') {
            dispatch(getEmployeeLeads())
        }
        else {
            dispatch(getLeads())
        }

        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}

export const updateLead = (leadId, leadData, options) => async (dispatch) => {
    try {
        !options?.loading ? null : dispatch(start())
        const { data } = await api.updateLead(leadId, leadData)
        dispatch(updateLeadReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const shiftLead = (leadId, shiftTo) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.shiftLead(leadId, shiftTo)
        dispatch(updateLeadReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const shareLead = (leadId, shareWith) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.shareLead(leadId, shareWith)
        dispatch(updateLeadReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const archiveLead = (leadId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.archiveLead(leadId)
        dispatch(updateLeadReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
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
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}