import toast from 'react-hot-toast'
import * as api from '../api'
import { start, end, error, getSocietyReducer, getSocietiesReducer, createSocietyReducer, updateSocietyReducer, deleteSocietyReducer, } from '../reducer/society'
import { getUsersReducer } from '../reducer/user'


export const getSociety = (societyId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getSociety(societyId)
        dispatch(getSocietyReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const getSocieties = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getSocieties()
        dispatch(getSocietiesReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const getUsers = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getUsers()
        dispatch(getUsersReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const searchSociety = (searchTerm, isArchived) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.searchSociety(searchTerm, isArchived)
        dispatch(getSocietiesReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const filterSociety = (filters) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.filterSociety(filters)
        dispatch(getSocietiesReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const createSociety = (societyData, navigate) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.createSociety(societyData)
        dispatch(createSocietyReducer(data.result))
        navigate('/societies')
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const updateSociety = (societyId, societyData) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.updateSociety(societyId, societyData)
        dispatch(updateSocietyReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const deleteSociety = (societyId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.deleteSociety(societyId)
        dispatch(deleteSocietyReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}