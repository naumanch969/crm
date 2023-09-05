import { createSlice } from "@reduxjs/toolkit";

const cashbookSlice = createSlice({
    name: 'cashbook',
    initialState: {
        isFetching: false,
        error: null,
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
        getCashbooksReducer: (state, action) => {
            const { type, result } = action.payload
            switch (type) {
                case 'in':
                    state.cashbooksIn = result
                    break;
                case 'out':
                    state.cashbooksOut = result
                    break;
                default:
                    break;
            }
        },
        getIncomeAndExpensesReducer: (state, action) => {
            state.incomeAndExpenses = action.payload
        },
        getPaymentsReducer: (state, action) => {
            state.payments = action.payload
        },
        createCashbookReducer: (state, action) => {
            switch (action.payload.type) {
                case 'in':
                    state.cashbooksIn = [action.payload, ...state.cashbooksIn]
                    break;
                case 'out':
                    state.cashbooksOut = [action.payload, ...state.cashbooksOut]
                    break;
                default:
                    break;
            }
        },
        deleteCashbookReducer: (state, action) => {
            console.log('action.apyload',action.payload)
            switch (action.payload.type) {
                case 'in':
                    state.cashbooksIn = state.cashbooksIn.filter(c => c._id != action.payload._id)
                    break;
                case 'out':
                    state.cashbooksOut = state.cashbooksOut.filter(c => c._id != action.payload._id)
                    break;
                default:
                    return state
                    break;
            }
        },
    }
})

export const { start, end, error, getCashbookReducer, getSpecificDateCashbookReducer, getCashbooksReducer, getIncomeAndExpensesReducer, getPaymentsReducer, createCashbookReducer, deleteCashbookReducer, } = cashbookSlice.actions
export default cashbookSlice.reducer