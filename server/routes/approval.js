import express from 'express'

import { getApproval, getApprovals, createRequestApproval, createVoucherApproval,  createReceiptApproval, createRefundApproval, rejectRequestApproval, deleteApproval, deleteWholeCollection } from '../controllers/approval.js'

const router = express.Router()

// GET
router.get('/get/single/:approvalId', getApproval)
router.get('/get/all', getApprovals)

// POST
router.post('/create/request', createRequestApproval)
router.post('/create/voucher', createVoucherApproval)
router.post('/create/receipt', createReceiptApproval)
router.post('/create/refund', createRefundApproval)
router.post('/reject/request', rejectRequestApproval)

// DELETE
router.delete('/delete/:approvalId', deleteApproval)
router.delete('/delete-whole-collection', deleteWholeCollection)

export default router