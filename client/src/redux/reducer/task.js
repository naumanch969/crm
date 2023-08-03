import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
    name: 'task',
    initialState: {
        isFetching: false,
        error: null,
        tasks: [],
        currentTask: null,
    },
    reducers: {
        start: (state) => { state.isFetching = true; state.error = null; },
        end: (state) => { state.isFetching = false },
        error: (state, action) => { state.isFetching = false; state.error = action.payload; },
    }
})

export const { start, end, error } = taskSlice.actions
export default taskSlice.reducer