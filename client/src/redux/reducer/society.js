import { createSlice } from "@reduxjs/toolkit";

const societySlice = createSlice({
    name: 'society',
    initialState: {
        isFetching: false,
        error: null,
        societies: [],
        allSocieties: [],
        stats: [],
        currentSociety: null,
    },
    reducers: {
        start: (state) => { state.isFetching = true; state.error = null; },
        end: (state) => { state.isFetching = false },
        error: (state, action) => { state.isFetching = false; state.error = action.payload; },

        getSocietyReducer: (state, action) => { state.currentSociety = action.payload },
        getSocietiesReducer: (state, action) => { state.societies = action.payload; state.allSocieties = action.payload },
        searchSocietyReducer: (state, action) => {
            const { allSocieties } = state;
            const { payload: searchTerm } = action;

            const searchedSocieties = allSocieties.filter((society) => {
                const itemValues = Object.values(society);
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
            state.societies = searchedSocieties;
        },
        filterSocietyReducer: (state, action) => {
            const { allSocieties } = state;
            const { payload: filters } = action;

            const filteredSocieties = allSocieties.filter((society) => {
                return Object.entries(filters).every(([key, filterValue]) => {
                    const societyValue = society[key];

                    if (Array.isArray(filterValue)) {
                        // Handle array filters (e.g., checking if societyValue is in filterValue)
                        return filterValue.includes(societyValue);
                    } else if (typeof filterValue === 'string') {
                        // Handle string filters (e.g., checking if societyValue includes filterValue)
                        return String(societyValue).toLowerCase().includes(filterValue.toLowerCase());
                    } else {
                        // Handle other types of filters (e.g., equality checks)
                        return societyValue === filterValue;
                    }
                });
            });

            state.societies = filteredSocieties;
        },

        createSocietyReducer: (state, action) => { state.societies = [action.payload, ...state.societies] },
        updateSocietyReducer: (state, action) => { state.societies = state.societies.map(s => s = s._id == action.payload._id ? action.payload : s) },
        deleteSocietyReducer: (state, action) => { state.societies = state.societies.filter(s => s._id != action.payload._id) },
    }
})

export const { start, end, error, getSocietyReducer, getSocietiesReducer, searchSocietyReducer, filterSocietyReducer, archiveSocietyReducer, unarchiveSocietyReducer, getUserAssignedSocietiesStatsReducer, createSocietyReducer, updateSocietyReducer, deleteSocietyReducer, } = societySlice.actions
export default societySlice.reducer