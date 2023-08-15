import { createSlice } from "@reduxjs/toolkit";

const cashbookSlice = createSlice({
    name: 'cashbook',
    initialState: {
        isFetching: false,
        error: null,
        cashbooksIn: [],
        cashbooksOut: [],
        currentcashbook: null,
    },
    reducers: {
        start: (state) => { state.isFetching = true; state.error = null; },
        end: (state) => { state.isFetching = false },
        error: (state, action) => { state.isFetching = false; state.error = action.payload; },
        getCashbookReducer: (state, action) => { state.currentcashbook = action.payload },
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
             switch (action.payload.type) {
                case 'in':
                    state.cashbooksIn = state.cashbooksIn.filter(c => c._id != action.payload._id)
                    break;
                    case 'out':
                    state.cashbooksIn = state.cashbooksIn.filter(c => c._id != action.payload._id)
                    break;
                default:
                    break;
            }
        },
    }
})

export const { start, end, error, getCashbookReducer, getCashbooksReducer, createCashbookReducer, deleteCashbookReducer, } = cashbookSlice.actions
export default cashbookSlice.reducer