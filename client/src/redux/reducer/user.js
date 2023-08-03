import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isFetching: false,
        error: null,
        users: [],
        currentUser: null,
        loggedUser: null
    },
    reducers: {
        start: (state) => { state.isFetching = true; state.error = null; },
        end: (state) => { state.isFetching = false },
        error: (state, action) => { state.isFetching = false; state.error = action.payload; },
    }
})

export const { start, end, error } = userSlice.actions
export default userSlice.reducer