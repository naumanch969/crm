import toast from 'react-hot-toast'
import * as api from '../api'
import { start, end, error, getEventReducer, getEventsReducer, createEventReducer, updateEventReducer, deleteEventReducer, } from '../reducer/event'

export const getEvent = (eventId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getEvent(eventId)
        dispatch(getEventReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const getEvents = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getEvents()
        const result = data.result.map((event) => ({ ...event, start: new Date(event.start), end: new Date(event.end) }))
        dispatch(getEventsReducer(result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const getEmployeeEvents = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getEmployeeEvents()
        const result = data.result.map((event) => ({ ...event, start: new Date(event.start), end: new Date(event.end) }))
        dispatch(getEventsReducer(result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const createEvent = (eventData) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.createEvent(eventData)
        dispatch(createEventReducer(data.result))
        dispatch(getEvents())
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const updateEvent = (eventId, eventData) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.updateEvent(eventId, eventData)
        dispatch(updateEventReducer(data.result))
        dispatch(getEvents())
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const deleteEvent = (eventId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.deleteEvent(eventId)
        dispatch(getEvents())
        dispatch(deleteEventReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}