import express from 'express'
import { createInventory, getInventory, getInventories, getEmployeeInventories, updateInventory, deleteInventory, deleteWholeCollection, searchInventory, filterInventory } from '../controllers/inventory.js'
import { verifyEmployee, verifyManager, verifyToken } from '../middleware/auth.js'

const router = express.Router()

// GET
router.get('/get/single/:inventoryId', verifyToken, getInventory)
router.get('/get/all', verifyToken, verifyEmployee, getInventories)
router.get('/get/employee', verifyToken, verifyEmployee, getEmployeeInventories)
router.get('/search', verifyToken, verifyEmployee, searchInventory)
router.get('/filter', verifyToken, verifyEmployee, filterInventory)

// POST
router.post('/create', verifyToken, verifyManager, createInventory)

// PUT
router.put('/update/:inventoryId', verifyToken, verifyManager, updateInventory)

// DELETE
router.delete('/delete/:inventoryId', verifyToken, verifyManager, deleteInventory)
router.delete('/delete-whole-collection', deleteWholeCollection)

export default router