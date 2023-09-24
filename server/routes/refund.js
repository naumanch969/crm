import express from 'express'

import { getRefund, getRefunds, createRefund, updateRefund, deleteRefund, deleteWholeCollection, getLeadRefunds, acceptRefund, rejectRefund } from '../controllers/refund.js'
import { verifyEmployee, verifyToken } from '../middleware/auth.js'

const router = express.Router()

// GET
router.get('/get/single/:refundId', verifyToken, verifyEmployee, getRefund)
router.get('/get/all', verifyToken, verifyEmployee, getRefunds)
router.get('/get/lead', verifyToken, verifyEmployee, getLeadRefunds)

// POST
router.post('/create', verifyToken, verifyEmployee, createRefund)

// PUT
router.put('/update/:refundId', verifyToken, verifyEmployee, updateRefund)
router.put('/accept/:refundId', verifyToken, verifyEmployee, acceptRefund)
router.put('/reject/:refundId', verifyToken, verifyEmployee, rejectRefund)

// DELETE
router.delete('/delete/:refundId', verifyToken, verifyEmployee, deleteRefund)
router.delete('/delete-whole-collection', deleteWholeCollection)

export default router