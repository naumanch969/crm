import { createSlice } from "@reduxjs/toolkit";

const meetingSlice = createSlice({
    name: 'meeting',
    initialState: {
        isFetching: false,
        error: null,
        meetings: [],
        allMeetings: [],
        currentmeeting: null,
    },
    reducers: {
        start: (state) => { state.isFetching = true; state.error = null; },
        end: (state) => { state.isFetching = false },
        error: (state, action) => { state.isFetching = false; state.error = action.payload; },
        getMeetingReducer: (state, action) => { state.currentmeeting = action.payload },
        getMeetingsReducer: (state, action) => { state.meetings = action.payload; state.allMeetings = action.payload },
        searchMeetingReducer: (state, action) => {
            const { allMeetings } = state;
            const { payload: searchTerm } = action;

            const searchedMeetings = allMeetings.filter((meeting) => {
                const itemValues = Object.values(meeting);
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
            state.meetings = searchedMeetings;
        },
        filterMeetingReducer: (state, action) => {
            const { allMeetings } = state;
            const { payload: filters } = action;

            const filteredMeetings = allMeetings.filter((meeting) => {
                return Object.entries(filters).every(([key, filterValue]) => {
                    const meetingValue = meeting[key];

                    if (Array.isArray(filterValue)) {
                        // Handle array filters (e.g., checking if meetingValue is in filterValue)
                        return filterValue.includes(meetingValue);
                    } else if (typeof filterValue === 'string') {
                        // Handle string filters (e.g., checking if meetingValue includes filterValue)
                        return String(meetingValue).toLowerCase().includes(filterValue.toLowerCase());
                    } else {
                        // Handle other types of filters (e.g., equality checks)
                        return meetingValue === filterValue;
                    }
                });
            });

            state.meetings = filteredMeetings;
        },

        createMeetingReducer: (state, action) => { state.meetings = [action.payload, ...state.meetings] },
        updateMeetingReducer: (state, action) => { state.meetings = state.meetings.map(m => m = m._id == action.payload._id ? action.payload : m) },
        deleteMeetingReducer: (state, action) => { state.meetings = state.meetings.filter(m => m._id != action.payload._id) },
    }
})

export const { start, end, error, getMeetingReducer, getMeetingsReducer, searchMeetingReducer, filterMeetingReducer, createMeetingReducer, updateMeetingReducer, deleteMeetingReducer, } = meetingSlice.actions
export default meetingSlice.reducer