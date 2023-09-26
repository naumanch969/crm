import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        isFetching: false,
        error: null,
        notifications: [],
        currentNotification: {},
    },
    reducers: {
        start: (state) => { state.isFetching = true; state.error = null; },
        end: (state) => { state.isFetching = false },
        error: (state, action) => { state.isFetching = false; state.error = action.payload; },

        getNotificationReducer: (state, action) => { state.currentNotification = action.payload },
        getNotificationsReducer: (state, action) => { state.notifications = action.payload; state.notifications = action.payload },
        searchNotificationReducer: (state, action) => {
            const { allNotifications } = state;
            const { payload: searchTerm } = action;

            const searchedNotifications = allNotifications.filter((notification) => {
                const itemValues = Object.values(notification);
                return itemValues.some((value) => {
                    if (typeof value === 'object') {
                        const subItemValues = Object.values(value);
                        return subItemValues.some((subValue) =>
                            String(subValue).toLowerCase().includes(searchTerm.toLowerCase())
                        );
                    } else {
                        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
                    }
                });
            });
            state.notifications = searchedNotifications;
        },

        createNotificationReducer: (state, action) => { state.notifications = [action.payload, ...state.notifications] },
        deleteNotificationReducer: (state, action) => { state.notifications = state.notifications.filter(n => n._id != action.payload._id) },

    }
})

export const { start, end, error, getNotificationReducer, getNotificationsReducer, searchNotificationReducer, createNotificationReducer, deleteNotificationReducer, } = notificationSlice.actions
export default notificationSlice.reducer