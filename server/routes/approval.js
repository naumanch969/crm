import express from 'express'

import { getApproval, getApprovals, createRequestApproval, createVoucherApproval,  createRefundApproval, rejectRequestApproval, deleteApproval, deleteWholeCollection, acceptVoucherApproval, rejectVoucherApproval } from '../controllers/approval.js'
import { verifyToken, verifyEmployee, verifyManager } from '../middleware/auth.js'
const router = express.Router()

// GET
router.get('/get/single/:approvalId', getApproval)
router.get('/get/all', getApprovals)

// POST
router.post('/create/request', verifyToken, verifyEmployee, createRequestApproval)

router.post('/create/voucher', verifyToken, verifyEmployee, createVoucherApproval)
router.post('/accept/voucher/:approvalId', verifyToken, verifyManager, acceptVoucherApproval)
router.post('/reject/voucher/:approvalId', verifyToken, verifyManager, rejectVoucherApproval)

router.post('/create/refund', verifyToken, verifyEmployee, createRefundApproval)
router.post('/reject/request', verifyToken, verifyEmployee, rejectRequestApproval)

// DELETE
router.delete('/delete/:approvalId', verifyToken, verifyEmployee, deleteApproval)
router.delete('/delete-whole-collection', deleteWholeCollection)

export default router