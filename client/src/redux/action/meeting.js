import * as api from '../api'
import { start, end, error, getMeetingReducer, getMeetingsReducer, createMeetingReducer, updateMeetingReducer, deleteMeetingReducer, } from '../reducer/meeting'

export const getMeeting = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getMeeting()
        dispatch(getMeetingReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const getMeetings = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getMeetings()
        dispatch(getMeetingsReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const createMeeting = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.createMeeting()
        dispatch(createMeetingReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const updateMeeting = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.updateMeeting()
        dispatch(updateMeetingReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const deleteMeeting = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.deleteMeeting()
        dispatch(deleteMeetingReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}