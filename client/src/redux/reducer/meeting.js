import { createSlice } from "@reduxjs/toolkit";

const meetingSlice = createSlice({
    name: 'meeting',
    initialState: {
        isFetching: false,
        error: null,
        meetings: [],
        currentmeeting: null,
    },
    reducers: {
        start: (state) => { state.isFetching = true; state.error = null; },
        end: (state) => { state.isFetching = false },
        error: (state, action) => { state.isFetching = false; state.error = action.payload; },
        getMeetingReducer: (state, action) => { state.currentmeeting = action.payload },
        getMeetingsReducer: (state, action) => { state.meetings = action.payload },
        createMeetingReducer: (state, action) => { state.meetings = [action.payload, ...state.meetings] },
        updateMeetingReducer: (state, action) => { state.meetings = state.meetings.map(m => m = m._id == action.payload._id ? action.payload : m) },
        deleteMeetingReducer: (state, action) => { state.meetings = state.meetings.filter(m => m._id != action.payload._id) },
    }
})

export const { start, end, error, getMeetingReducer, getMeetingsReducer, createMeetingReducer, updateMeetingReducer, deleteMeetingReducer, } = meetingSlice.actions
export default meetingSlice.reducer