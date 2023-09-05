import * as api from '../api'
import { start, end, error, getNotificationReducer, getNotificationsReducer, createNotificationReducer, deleteNotificationReducer, } from '../reducer/notification'


export const getNotification = (notificationId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getNotification(notificationId)
        dispatch(getNotificationReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const getNotifications = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getNotifications()
        dispatch(getNotificationsReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}

export const sendUrgentTaskNotifications = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getNotifications()
        dispatch(getNotificationsReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const createRequestNotification = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.createRequestNotification()
        dispatch(createNotificationReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const deleteNotification = (notificationId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.deleteNotification(notificationId)
        dispatch(deleteNotificationReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}