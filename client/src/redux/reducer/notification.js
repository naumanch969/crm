import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        isFetching: false,
        error: null,
        notifications: [],
        currentnotification: null,
    },
    reducers: {
        start: (state) => { state.isFetching = true; state.error = null; },
        end: (state) => { state.isFetching = false },
        error: (state, action) => { state.isFetching = false; state.error = action.payload; },

        getNotificationReducer: (state, action) => { state.currentnotification = action.payload },
        getNotificationsReducer: (state, action) => { state.notifications = action.payload },
        createRequestNotificationReducer: (state, action) => { state.notifications = [action.payload, ...state.notifications] },
        deleteNotificationReducer: (state, action) => { state.notifications = state.notifications.filter(n => n._id !== action.payload._id) },

    }
})

export const { start, end, error, getNotificationReducer, getNotificationsReducer, createRequestNotificationReducer, deleteNotificationReducer, } = notificationSlice.actions
export default notificationSlice.reducer