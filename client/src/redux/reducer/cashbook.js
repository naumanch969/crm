import { createSlice } from "@reduxjs/toolkit";

const cashbookSlice = createSlice({
    name: 'cashbook',
    initialState: {
        isFetching: false,
        error: null,
        cashbooks: [],
        cashbooksIn: [],
        cashbooksOut: [],
        incomeAndExpenses: [],
        payments: null,
        currentcashbook: null,
    },
    reducers: {
        start: (state) => { state.isFetching = true; state.error = null; },
        end: (state) => { state.isFetching = false },
        error: (state, action) => { state.isFetching = false; state.error = action.payload; },
        getCashbookReducer: (state, action) => { state.currentcashbook = action.payload },
        getSpecificDateCashbookReducer: (state, action) => {
            const { cashIn, cashOut } = action.payload
            state.cashbooksIn = cashIn
            state.cashbooksOut = cashOut
        },
        getCashbooksReducer: (state, action) => { state.cashbooks = action.payload },
        getIncomeAndExpensesReducer: (state, action) => {
            state.incomeAndExpenses = action.payload
        },
        getPaymentsReducer: (state, action) => {
            state.payments = action.payload
        },
        createCashbookReducer: (state, action) => {
            state.cashbooks = [action.payload, ...state.cashbooks]
        },
        deleteCashbookReducer: (state, action) => {
            state.cashbooks = state.cashbooks.filter(c => c._id != action.payload._id)
        },
    }
})

export const { start, end, error, getCashbookReducer, getSpecificDateCashbookReducer, getCashbooksReducer, getIncomeAndExpensesReducer, getPaymentsReducer, createCashbookReducer, deleteCashbookReducer, } = cashbookSlice.actions
export default cashbookSlice.reducer