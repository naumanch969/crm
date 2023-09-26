import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
    name: 'event',
    initialState: {
        isFetching: false,
        error: null,
        events: [],
        allEvents: [],
        currentevent: null,
    },
    reducers: {
        start: (state) => { state.isFetching = true; state.error = null; },
        end: (state) => { state.isFetching = false },
        error: (state, action) => { state.isFetching = false; state.error = action.payload; },
        getEventReducer: (state, action) => { state.currentevent = action.payload },
        getEventsReducer: (state, action) => { state.events = action.payload; state.allEvents = action.payload },
        searchEventReducer: (state, action) => {
            const { allEvents } = state;
            const { payload: searchTerm } = action;

            const searchedEvents = allEvents.filter((event) => {
                const itemValues = Object.values(event);
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
            state.events = searchedEvents;
        },
        filterEventReducer: (state, action) => {
            const { allEvents } = state;
            const { payload: filters } = action;

            const filteredEvents = allEvents.filter((event) => {
                return Object.entries(filters).every(([key, filterValue]) => {
                    const eventValue = event[key];

                    if (Array.isArray(filterValue)) {
                        // Handle array filters (e.g., checking if eventValue is in filterValue)
                        return filterValue.includes(eventValue);
                    } else if (typeof filterValue === 'string') {
                        // Handle string filters (e.g., checking if eventValue includes filterValue)
                        return String(eventValue).toLowerCase().includes(filterValue.toLowerCase());
                    } else {
                        // Handle other types of filters (e.g., equality checks)
                        return eventValue === filterValue;
                    }
                });
            });

            state.events = filteredEvents;
        },

        createEventReducer: (state, action) => { state.events = [action.payload, ...state.events] },
        updateEventReducer: (state, action) => { state.events = state.events.map(m => m = m._id == action.payload._id ? action.payload : m) },
        deleteEventReducer: (state, action) => { state.events = state.events.filter(m => m._id != action.payload._id) },
    }
})

export const { start, end, error, getEventReducer, getEventsReducer, searchEventReducer, filterEventReducer, createEventReducer, updateEventReducer, deleteEventReducer, } = eventSlice.actions
export default eventSlice.reducer