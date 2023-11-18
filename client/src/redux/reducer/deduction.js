import { createSlice } from "@reduxjs/toolkit";

const deductionSlice = createSlice({
    name: 'deduction',
    initialState: {
        isFetching: false,
        error: null,
        deductions: [],
        currentDeduction: null,
    },
    reducers: {
        start: (state) => { state.isFetching = true; state.error = null; },
        end: (state) => { state.isFetching = false },
        error: (state, action) => { state.isFetching = false; state.error = action.payload; },
        getDeductionsReducer: (state, action) => { state.deductions = action.payload },
        getDeductionReducer: (state, action) => { state.currentDeduction = action.payload },
        createDeductionReducer: (state, action) => { state.deductions = [...state.deductions, action.payload] },
        updateDeductionReducer: (state, action) => { state.deductions = state.deductions.map(d => d = d._id == action.payload._id ? action.payload : d) },
        deleteDeductionReducer: (state, action) => { state.deductions = state.deductions.filter(d => d._id != action.payload) },
    }
})

export const {
    start,
    end,
    error,
    getDeductionsReducer,
    getDeductionReducer,
    createDeductionReducer,
    updateDeductionReducer,
    deleteDeductionReducer,
} = deductionSlice.actions

export default deductionSlice.reducer