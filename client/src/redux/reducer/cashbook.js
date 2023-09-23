import { createSlice } from "@reduxjs/toolkit";

const cashbookSlice = createSlice({
    name: 'cashbook',
    initialState: {
        isFetching: false,
        error: null,
        allCashbooks: [],
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
        getCashbooksReducer: (state, action) => { state.cashbooks = action.payload; state.allCashbooks = action.payload },
        getSpecificDateCashbookReducer: (state, action) => {
            const { cashIn, cashOut } = action.payload
            state.cashbooksIn = cashIn
            state.cashbooksOut = cashOut
        },
        getIncomeAndExpensesReducer: (state, action) => { state.incomeAndExpenses = action.payload },
        getPaymentsReducer: (state, action) => { state.payments = action.payload },
        searchCashbookReducer: (state, action) => {
            const { allCashbooks } = state;
            const { payload: searchTerm } = action;

            const searchedCashbooks = allCashbooks.filter((cashbook) => {
                const itemValues = Object.values(cashbook);
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
            state.cashbooks = searchedCashbooks;
        },
        filterCashbookReducer: (state, action) => {
            const { allCashbooks } = state;
            const { payload: filters } = action;

            const filteredCashbooks = allCashbooks.filter((cashbook) => {
                return Object.entries(filters).every(([key, filterValue]) => {
                    const cashbookValue = cashbook[key];

                    if (Array.isArray(filterValue)) {
                        // Handle array filters (e.g., checking if cashbookValue is in filterValue)
                        return filterValue.includes(cashbookValue);
                    } else if (typeof filterValue === 'string') {
                        // Handle string filters (e.g., checking if cashbookValue includes filterValue)
                        return String(cashbookValue).toLowerCase().includes(filterValue.toLowerCase());
                    } else {
                        // Handle other types of filters (e.g., equality checks)
                        return cashbookValue === filterValue;
                    }
                });
            });

            state.cashbooks = filteredCashbooks;
        },

        createCashbookReducer: (state, action) => { state.cashbooks = [action.payload, ...state.cashbooks] },
        deleteCashbookReducer: (state, action) => { state.cashbooks = state.cashbooks.filter(c => c._id != action.payload._id) },
    }
})

export const { start, end, error, getCashbookReducer, searchCashbookReducer, filterCashbookReducer, getSpecificDateCashbookReducer, getCashbooksReducer, getIncomeAndExpensesReducer, getPaymentsReducer, createCashbookReducer, deleteCashbookReducer, } = cashbookSlice.actions
export default cashbookSlice.reducer