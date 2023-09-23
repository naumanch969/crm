import { createSlice } from "@reduxjs/toolkit";

const leadSlice = createSlice({
    name: 'lead',
    initialState: {
        isFetching: false,
        error: null,
        allLeads: [],
        leads: [],
        stats: [],
        successful: [],
        unsuccessful: [],
        underProcess: [],
        remaining: [],
        declined: [],
        currentLead: null,
    },
    reducers: {
        start: (state) => { state.isFetching = true; state.error = null; },
        end: (state) => { state.isFetching = false },
        error: (state, action) => { state.isFetching = false; state.error = action.payload; },
        getLeadsReducer: (state, action) => { state.leads = action.payload; state.allLeads = action.payload },
        getLeadReducer: (state, action) => { state.currentLead = action.payload },
        getLeadsStatReducer: (state, action) => { state.stats = action.payload },
        createLeadReducer: (state, action) => { state.leads = [action.payload, ...state.leads] },
        updateLeadReducer: (state, action) => { state.leads = state.leads.map(l => l = l._id == action.payload._id ? action.payload : l) },

        // Replace searchLead reducer with the provided code
        searchLeadReducer: (state, action) => {
            const { allLeads } = state;
            const { payload: searchTerm } = action;

            const searchedLeads = allLeads.filter((lead) => {
                const itemValues = Object.values(lead);
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
            state.leads = searchedLeads;
        },
        filterLeadReducer: (state, action) => {
            const { allLeads } = state;
            const { payload: filters } = action;

            const filteredLeads = allLeads.filter((lead) => {
                return Object.entries(filters).every(([key, filterValue]) => {
                    const leadValue = lead[key];

                    if (Array.isArray(filterValue)) {
                        // Handle array filters (e.g., checking if leadValue is in filterValue)
                        return filterValue.includes(leadValue);
                    } else if (typeof filterValue === 'string') {
                        // Handle string filters (e.g., checking if leadValue includes filterValue)
                        return String(leadValue).toLowerCase().includes(filterValue.toLowerCase());
                    } else {
                        // Handle other types of filters (e.g., equality checks)
                        return leadValue === filterValue;
                    }
                });
            });

            state.leads = filteredLeads;
        },

        deleteLeadReducer: (state, action) => { state.leads = state.leads.filter(l => l._id != action.payload._id) },
    }
})

export const { start, end, error, searchLeadReducer, filterLeadReducer, getLeadsReducer, getLeadReducer, getLeadsStatReducer, createLeadReducer, updateLeadReducer, deleteLeadReducer, searchLead } = leadSlice.actions
export default leadSlice.reducer
