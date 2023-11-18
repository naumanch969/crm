import { createSlice } from "@reduxjs/toolkit";

const approvalSlice = createSlice({
    name: 'approval',
    initialState: {
        isFetching: false,
        error: null,
        requestApprovals: [],
        voucherApprovals: [],
        receiptApprovals: [],
        refundApprovals: [],
        currentapproval: null,
    },
    reducers: {
        start: (state) => { state.isFetching = true; state.error = null; },
        end: (state) => { state.isFetching = false },
        error: (state, action) => { state.isFetching = false; state.error = action.payload; },
        getApprovalReducer: (state, action) => { state.currentapproval = action.payload },
        getApprovalsReducer: (state, action) => {
            const { type, result } = action.payload
            switch (type) {
                case 'request':
                    state.requestApprovals = result
                    break;
                case 'voucher':
                    state.voucherApprovals = result
                    break;
                case 'receipt':
                    state.receiptApprovals = result
                    break;
                case 'refund':
                    state.refundApprovals = result
                    break;
                default:
                    break;
            }
        },
        createRequestApprovalReducer: (state, action) => { state.requestApprovals = [action.payload, ...state.requestApprovals] },
        rejectRequestApprovalReducer: (state, action) => { state.requestApprovals = [action.payload, ...state.requestApprovals] },
        createVoucherApprovalReducer: (state, action) => { state.voucherApprovals = [action.payload, ...state.requestApprovals] },
        acceptVoucherApprovalReducer: (state, action) => {
            state.voucherApprovals = state.voucherApprovals.map((voucher) => ({ ...voucher, status: voucher._id == action.payload ? 'accepted' : voucher.status }))
        },
        rejectVoucherApprovalReducer: (state, action) => {
            state.voucherApprovals = state.voucherApprovals.map((voucher) => ({ ...voucher, status: voucher._id == action.payload ? 'declined' : voucher.status }))
        },
        createReceiptApprovalReducer: (state, action) => {
            if (action.payload.isAppliedForRefund) {
                return state
            }
            else {
                state.receiptApprovals = [action.payload, ...state.requestApprovals]
            }
        },
        createRefundApprovalReducer: (state, action) => { state.refundApprovals = [action.payload, ...state.refundApprovals] },
        rejectRefundApprovalReducer: (state, action) => { state.refundApprovals = state.refundApprovals.filter(a => a._id != action.payload._id) },
        deleteApprovalReducer: (state, action) => {
            const { type, result } = action.payload
            switch (type) {
                case 'request':
                    state.requestApprovals = state.requestApprovals.filter(a => a._id != result._id)
                    break;
                case 'voucher':
                    state.voucherApprovals = state.voucherApprovals.filter(a => a._id != result._id)
                    break;
                case 'receipt':
                    state.receiptApprovals = state.receiptApprovals.filter(a => a._id != result._id)
                    break;
                case 'refund':
                    state.refundApprovals = state.refundApprovals.filter(a => a._id != result._id)
                    break;
                default:
                    break;
            }
        },
        updateUserReducer: (state, action) => {
            switch (action.payload.role) {
                case 'client':
                    state.clients = state.clients.map(c => c = c._id == action.payload._id ? action.payload : c)
                    break;
                case 'employee':
                    state.employees = state.employees.map(e => e = e._id == action.payload._id ? action.payload : e)
                    break;
                default:
                    break;
            }
        },
        deleteUserReducer: (state, action) => {
            switch (action.payload.role) {
                case 'client':
                    state.clients = state.clients.filter(c => c._id != action.payload._id)
                    break;
                case 'employee':
                    state.employees = state.employees.filter(e => e._id != action.payload._id)
                    break;
                default:
                    break;
            }
        },
    }
})

export const {
    start, end, error, getApprovalReducer, getApprovalsReducer, createRequestApprovalReducer,
    rejectVoucherApprovalReducer,
    acceptVoucherApprovalReducer,
    rejectRequestApprovalReducer, createVoucherApprovalReducer, createReceiptApprovalReducer, rejectRefundApprovalReducer, createRefundApprovalReducer, deleteApprovalReducer,
} = approvalSlice.actions
export default approvalSlice.reducer