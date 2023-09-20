import { createSlice } from "@reduxjs/toolkit";

const followUpSlice = createSlice({
    name: 'followUp',
    initialState: {
        isFetching: false,
        error: null,
        followUps: [],
        currentFollowUp: null,
    },
    reducers: {
        start: (state) => { state.isFetching = true; state.error = null; },
        end: (state) => { state.isFetching = false },
        error: (state, action) => { state.isFetching = false; state.error = action.payload; },
        getFollowUpReducer: (state, action) => { state.currentFollowUp = action.payload },
        getFollowUpsReducer: (state, action) => { state.followUps = action.payload },
        createFollowUpReducer: (state, action) => { state.followUps = [action.payload, ...state.followUps] },
        deleteFollowUpReducer: (state, action) => { state.followUps = state.followUps.filter(m => m._id != action.payload._id) },
    }
})

export const { start, end, error, getFollowUpReducer, getFollowUpsReducer, createFollowUpReducer, deleteFollowUpReducer, } = followUpSlice.actions
export default followUpSlice.reducer