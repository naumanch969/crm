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
        getSaleReducer: (state, action) => {state.currentSale =action.payload },
        getSalesReducer: (state, action) => {state.sales = action.payload },
        createSaleReducer: (state, action) => {state.sales = [...state.sales, action.payload]  },
        updateSaleReducer: (state, action) => { state.sales = state.sales.map(s => s = s._id == action.payload._id ? action.payload : s) },
        deleteSaleReducer: (state, action) => {state.sales = state.sales.filter(s => s._id != action.payload._id)  },
    }
})

export const { start, end, error, getSaleReducer, getSalesReducer, createSaleReducer, updateSaleReducer, deleteSaleReducer, } = saleSlice.actions
export default saleSlice.reducer