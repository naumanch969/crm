import express from 'express'
import { createOnsiteLead, createOnlineLead, getLead,getEmployeeLeads, getLeadsStat, getLeads, updateLead, deleteLead, deleteWholeCollection } from '../controllers/lead.js'
import { verifyEmployee, verifyManager, verifyToken } from '../middleware/auth.js'

const router = express.Router()

// GET
router.get('/get/single/:leadId', getLead)
router.get('/get/employee', verifyToken, verifyEmployee, getEmployeeLeads)
router.get('/get/all', verifyToken, verifyManager, getLeads)
router.get('/get/stats', getLeadsStat)

// POST
router.post('/create/onsite', verifyToken, verifyEmployee, createOnsiteLead)
router.post('/create/online', verifyToken, createOnlineLead)

// PUT
router.put('/update/:leadId', verifyToken, verifyEmployee, updateLead)

// DELETE
router.delete('/delete/:leadId', verifyToken, verifyEmployee, deleteLead)
router.delete('/delete-whole-collection', deleteWholeCollection)

export default router