import express from 'express'
import { createLead, getLead, getLeads, updateLead, deleteLead, deleteWholeCollection } from '../controllers/lead.js'
import { verifyEmployee, verifyManager, verifyToken } from '../middleware/auth.js'

const router = express.Router()

// GET
router.get('/get/single/:leadId',  getLead)
router.get('/get/all', verifyToken, verifyEmployee, getLeads)

// POST
router.post('/create', verifyToken, verifyManager, createLead)

// PUT
router.put('/update/:leadId', verifyToken, verifyManager, updateLead)

// DELETE
router.delete('/delete/:leadId', verifyToken, verifyManager, deleteLead)
router.delete('/delete-whole-collection', deleteWholeCollection)

export default router