import express from 'express'
import {  createCashbook, getCashbook,getIncomeAndExpenses, getPaymentsStat, getCashbooks, deleteCashbook, deleteWholeCollection } from '../controllers/cashbook.js'
import { verifyEmployee, verifyManager, verifyToken } from '../middleware/auth.js'

const router = express.Router()

// GET
router.get('/get/single/:cashbookId', getCashbook)
router.get('/get/all',  getCashbooks)
router.get('/get/income_and_expenses',  getIncomeAndExpenses)
router.get('/get/payments',  getPaymentsStat)

// POST
router.post('/create',  createCashbook)

// DELETE
router.delete('/delete/:cashbookId',  deleteCashbook)
router.delete('/delete-whole-collection', deleteWholeCollection)

export default router