import express from 'express'
import { createOnsiteLead, createOnlineLead, getLead, getLeads, updateLead, deleteLead, deleteWholeCollection } from '../controllers/lead.js'
import { verifyEmployee, verifyManager, verifyToken } from '../middleware/auth.js'

const router = express.Router()

// GET
router.get('/get/single/:leadId', getLead)
router.get('/get/all',  getLeads)//verifyToken, verifyEmployee,

// POST
router.post('/create/onsite',  createOnsiteLead)//verifyToken, verifyManager,
router.post('/create/online',  createOnlineLead)//verifyToken, verifyManager,

// PUT
router.put('/update/:leadId',  updateLead)//verifyToken, verifyManager,

// DELETE
router.delete('/delete/:leadId',  deleteLead)//verifyToken, verifyManager,
router.delete('/delete-whole-collection', deleteWholeCollection)

export default router