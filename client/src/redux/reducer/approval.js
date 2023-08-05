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
        createRequestApprovalReducer: (state, action) => { state.requestApprovals = [...state.requestApprovals, action.payload] },
        rejectRequestApprovalReducer: (state, action) => { state.requestApprovals = [...state.requestApprovals, action.payload] },
        createVoucherApprovalReducer: (state, action) => { state.voucherApprovals = [...state.requestApprovals, action.payload] },
        createReceiptApprovalReducer: (state, action) => { state.receiptApprovals = [...state.requestApprovals, action.payload] },
        createRefundApprovalReducer: (state, action) => { state.refundApprovals = [...state.requestApprovals, action.payload] },
        deleteApprovalReducer: (state, action) => {
            const { type, result } = action.payload
            switch (type) {
                case 'request':
                    state.requestApprovals = state.requestApprovals.filter(a => a._id !== result._id)
                    break;
                case 'voucher':
                    state.voucherApprovals = state.voucherApprovals.filter(a => a._id !== result._id)
                    break;
                case 'receipt':
                    state.receiptApprovals = state.receiptApprovals.filter(a => a._id !== result._id)
                    break;
                case 'refund':
                    state.refundApprovals = state.refundApprovals.filter(a => a._id !== result._id)
                    break;
                default:
                    break;
            }
        },
    }
})

export const { start, end, error, getApprovalReducer, getApprovalsReducer, createRequestApprovalReducer, rejectRequestApprovalReducer, createVoucherApprovalReducer, createReceiptApprovalReducer, createRefundApprovalReducer, deleteApprovalReducer, } = approvalSlice.actions
export default approvalSlice.reducer