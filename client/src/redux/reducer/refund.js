import { createSlice } from "@reduxjs/toolkit";

const refundSlice = createSlice({
    name: 'refund',
    initialState: {
        isFetching: false,
        error: null,
        refunds: [],
        allRefunds: [],
        currentrefund: null,
    },
    reducers: {
        start: (state) => { state.isFetching = true; state.error = null; },
        end: (state) => { state.isFetching = false },
        error: (state, action) => { state.isFetching = false; state.error = action.payload; },
        getRefundReducer: (state, action) => { state.currentrefund = action.payload },
        getRefundsReducer: (state, action) => { state.refunds = action.payload; state.allRefunds = action.payload },
        searchRefundReducer: (state, action) => {
            const { allRefunds } = state;
            const { payload: searchTerm } = action;

            const searchedRefunds = allRefunds.filter((refund) => {
                const itemValues = Object.values(refund);
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
            state.refunds = searchedRefunds;
        },
        filterRefundReducer: (state, action) => {
            const { allRefunds } = state;
            const { payload: filters } = action;

            const filteredRefunds = allRefunds.filter((refund) => {
                if (filters.branch && refund.branch.toLowerCase() != filters.branch.toLowerCase()) return false;
                if (filters.status && refund.status.toLowerCase() != filters.status.toLowerCase()) return false;
                return true;
            });

            state.refunds = filteredRefunds;
        },

        createRefundReducer: (state, action) => { state.refunds = [action.payload, ...state.refunds] },
        updateRefundReducer: (state, action) => { state.refunds = state.refunds.map(m => m = m._id == action.payload._id ? action.payload : m) },
        deleteRefundReducer: (state, action) => { state.refunds = state.refunds.filter(m => m._id != action.payload._id) },
    }
})

export const { start, end, error, getRefundReducer, getRefundsReducer, searchRefundReducer, filterRefundReducer, createRefundReducer, updateRefundReducer, deleteRefundReducer, } = refundSlice.actions
export default refundSlice.reducer