import express from 'express'
import { createVoucher, getVoucher, getPaymentsStat, getVouchers, deleteVoucher, deleteWholeCollection } from '../controllers/voucher.js'
import { verifyEmployee, verifyManager, verifyToken } from '../middleware/auth.js'

const router = express.Router()

// GET
router.get('/get/single/:voucherId', verifyToken, getVoucher)
router.get('/get/all', verifyToken, verifyEmployee, getVouchers)
router.get('/get/payments', verifyToken, verifyEmployee, getPaymentsStat)

// POST
router.post('/create', verifyToken, createVoucher)

// DELETE
router.delete('/delete/:voucherId', verifyToken, verifyEmployee, deleteVoucher)
router.delete('/delete-whole-collection', verifyToken, verifyEmployee, deleteWholeCollection)

export default router