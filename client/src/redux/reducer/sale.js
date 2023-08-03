import { createSlice } from "@reduxjs/toolkit";

const saleSlice = createSlice({
    name: 'sale',
    initialState: {
        isFetching: false,
        error: null,
        sales: [],
        currentSale: null,
    },
    reducers: {
        start: (state) => { state.isFetching = true; state.error = null; },
        end: (state) => { state.isFetching = false },
        error: (state, action) => { state.isFetching = false; state.error = action.payload; },
    }
})

export const { start, end, error } = saleSlice.actions
export default saleSlice.reducer