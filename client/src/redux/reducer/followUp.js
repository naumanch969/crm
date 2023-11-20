import { createSlice } from "@reduxjs/toolkit";

const followUpSlice = createSlice({
    name: 'followUp',
    initialState: {
        isFetching: false,
        error: null,
        allFollowUps: [],
        followUps: [],
        followUpsStats: [],
        currentFollowUp: null,
    },
    reducers: {
        start: (state) => { state.isFetching = true; state.error = null; },
        end: (state) => { state.isFetching = false },
        error: (state, action) => { state.isFetching = false; state.error = action.payload; },
        getFollowUpReducer: (state, action) => { state.currentFollowUp = action.payload },
        getFollowUpsReducer: (state, action) => { state.followUps = action.payload; state.allFollowUps = action.payload },
        getFollowUpsStatsReducer: (state, action) => {  state.followUpsStats = action.payload },
        searchFollowUpReducer: (state, action) => {
            const { allFollowUps } = state;
            const { payload: searchTerm } = action;

            const searchedFollowUps = allFollowUps.filter((followUp) => {
                const itemValues = Object.values(followUp);
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
            state.followUps = searchedFollowUps;
        },
        filterFollowUpReducer: (state, action) => {
            const { allFollowUps } = state;
            const { payload: filters } = action;

            const filteredFollowUps = allFollowUps.filter((followUp) => {
                return Object.entries(filters).every(([key, filterValue]) => {
                    const followUpValue = followUp[key];

                    if (Array.isArray(filterValue)) {
                        // Handle array filters (e.g., checking if followUpValue is in filterValue)
                        return filterValue.includes(followUpValue);
                    } else if (typeof filterValue === 'string') {
                        // Handle string filters (e.g., checking if followUpValue includes filterValue)
                        return String(followUpValue).toLowerCase().includes(filterValue.toLowerCase());
                    } else {
                        // Handle other types of filters (e.g., equality checks)
                        return followUpValue === filterValue;
                    }
                });
            });

            state.followUps = filteredFollowUps;
        },

        createFollowUpReducer: (state, action) => { state.followUps = [action.payload, ...state.followUps] },
        deleteFollowUpReducer: (state, action) => { state.followUps = state.followUps.filter(m => m._id != action.payload._id) },
    }
})

export const { start, end, error, getFollowUpReducer, getFollowUpsReducer, getFollowUpsStatsReducer, searchFollowUpReducer, filterFollowUpReducer, createFollowUpReducer, deleteFollowUpReducer, } = followUpSlice.actions
export default followUpSlice.reducer