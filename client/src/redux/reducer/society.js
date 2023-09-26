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
                if (filters.status && society.status.toLowerCase() != filters.status.toLowerCase()) return false;
                if (filters.startingDate && new Date(society.createdAt) < new Date(filters.startingDate)) return false;
                if (filters.endingDate && new Date(society.createdAt) > new Date(filters.endingDate)) return false;
                return true;
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