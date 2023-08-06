import express from 'express'
import { createSale, getSale, getSales, updateSale, deleteSale, deleteWholeCollection } from '../controllers/sale.js'
import { verifyEmployee, verifyManager, verifyToken } from '../middleware/auth.js'

const router = express.Router()

// GET
router.get('/get/single/:saleId', getSale)//verifyToken, verifyManager,
router.get('/get/all', getSales)//verifyToken, verifyManager,

// POST
router.post('/create', createSale)//verifyToken, verifyEmployee,

// PUT
router.put('/update/:saleId', updateSale)//verifyToken, verifyEmployee,

// DELETE
router.delete('/delete/:saleId', deleteSale)//verifyToken, verifyEmployee,
router.delete('/delete-whole-collection', deleteWholeCollection)

export default router