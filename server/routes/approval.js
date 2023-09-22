import express from 'express'

import { getApproval, getApprovals, createRequestApproval, createVoucherApproval, createReceiptApproval, createRefundApproval, rejectRequestApproval, deleteApproval, deleteWholeCollection } from '../controllers/approval.js'
import { verifyToken, verifyEmployee } from '../middleware/auth.js'
const router = express.Router()

// GET
router.get('/get/single/:approvalId', getApproval)
router.get('/get/all', getApprovals)

// POST
router.post('/create/request', verifyToken, verifyEmployee, createRequestApproval)
router.post('/create/voucher', verifyToken, verifyEmployee, createVoucherApproval)
router.post('/create/receipt', verifyToken, verifyEmployee, createReceiptApproval)
router.post('/create/refund', verifyToken, verifyEmployee, createRefundApproval)
router.post('/reject/request', verifyToken, verifyEmployee, rejectRequestApproval)

// DELETE
router.delete('/delete/:approvalId', verifyToken, verifyEmployee, deleteApproval)
router.delete('/delete-whole-collection', deleteWholeCollection)

export default router