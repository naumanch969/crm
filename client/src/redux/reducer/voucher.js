import { createSlice } from "@reduxjs/toolkit";

const voucherSlice = createSlice({
    name: 'voucher',
    initialState: {
        isFetching: false,
        error: null,
        allVouchers: [],
        vouchers: [],
        currentvoucher: null,
    },
    reducers: {
        start: (state) => { state.isFetching = true; state.error = null; },
        end: (state) => { state.isFetching = false },
        error: (state, action) => { state.isFetching = false; state.error = action.payload; },
        getVoucherReducer: (state, action) => { state.currentvoucher = action.payload },
        getVouchersReducer: (state, action) => { state.vouchers = action.payload; state.allVouchers = action.payload },
        searchVoucherReducer: (state, action) => {
            const { allVouchers } = state;
            const { payload: searchTerm } = action;

            const searchedVouchers = allVouchers.filter((voucher) => {
                const itemValues = Object.values(voucher);
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
            state.vouchers = searchedVouchers;
        },
        filterVoucherReducer: (state, action) => {
            const { allVouchers } = state;
            const { payload: filters } = action;

            const filteredVouchers = allVouchers.filter((voucher) => {
                return Object.entries(filters).every(([key, filterValue]) => {
                    const voucherValue = voucher[key];

                    if (Array.isArray(filterValue)) {
                        // Handle array filters (e.g., checking if voucherValue is in filterValue)
                        return filterValue.includes(voucherValue);
                    } else if (typeof filterValue === 'string') {
                        // Handle string filters (e.g., checking if voucherValue includes filterValue)
                        return String(voucherValue).toLowerCase().includes(filterValue.toLowerCase());
                    } else {
                        // Handle other types of filters (e.g., equality checks)
                        return voucherValue === filterValue;
                    }
                });
            });

            state.vouchers = filteredVouchers;
        },

        createVoucherReducer: (state, action) => { state.vouchers = [action.payload, ...state.vouchers]; },
        updateVoucherReducer: (state, action) => { state.vouchers = state.vouchers.map(v => v = v._id == action.payload._id ? action.payload : v) },
        deleteVoucherReducer: (state, action) => { state.vouchers = state.vouchers.filter(v => v._id != action.payload._id) },
    }
})

export const { start, end, error, getVoucherReducer, searchVoucherReducer, filterVoucherReducer, getVouchersReducer, createVoucherReducer, updateVoucherReducer, deleteVoucherReducer, } = voucherSlice.actions
export default voucherSlice.reducer