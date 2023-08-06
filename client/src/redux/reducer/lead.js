import { createSlice } from "@reduxjs/toolkit";

const leadSlice = createSlice({
    name: 'lead',
    initialState: {
        isFetching: false,
        error: null,
        leads: [],
        currentLead: null,
    },
    reducers: {
        start: (state) => { state.isFetching = true; state.error = null; },
        end: (state) => { state.isFetching = false },
        error: (state, action) => { state.isFetching = false; state.error = action.payload; },
        getLeadsReducer: (state, action) => { state.currentLead = action.payload},
        getLeadReducer: (state, action) => { state.leads = action.payload},
        createLeadReducer: (state, action) => { state.leads = [...state.leads, action.payload]},
        updateLeadReducer: (state, action) => { state.leads = state.leads.map(l => l = l._id == action.payload._id ? action.payload : l)},
        deleteLeadReducer: (state, action) => { state.leads = state.leads.filter(l => l._id != action.payload._id)},
    }
})

export const { start, end, error, getLeadsReducer, getLeadReducer, createLeadReducer, updateLeadReducer, deleteLeadReducer, } = leadSlice.actions
export default leadSlice.reducer