import { createSlice } from "@reduxjs/toolkit";

const voucherSlice = createSlice({
    name: 'voucher',
    initialState: {
        isFetching: false,
        error: null,
        vouchers: [],
        currentvoucher: null,
    },
    reducers: {
        start: (state) => { state.isFetching = true; state.error = null; },
        end: (state) => { state.isFetching = false },
        error: (state, action) => { state.isFetching = false; state.error = action.payload; },
        getVoucherReducer: (state, action) => { state.currentvoucher = action.payload },
        getVouchersReducer: (state, action) => { state.vouchers = action.payload },
        createVoucherReducer: (state, action) => { state.vouchers = [action.payload, ...state.vouchers];},
        updateVoucherReducer: (state, action) => { state.vouchers = state.vouchers.map(v => v = v._id == action.payload._id ? action.payload : v) },
        deleteVoucherReducer: (state, action) => { state.vouchers = state.vouchers.filter(v => v._id != action.payload._id) },
    }
})

export const { start, end, error, getVoucherReducer, getVouchersReducer, createVoucherReducer, updateVoucherReducer, deleteVoucherReducer, } = voucherSlice.actions
export default voucherSlice.reducer