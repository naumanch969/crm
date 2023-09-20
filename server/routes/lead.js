import express from 'express'
import {createLead, createOnsiteLead, createOnlineLead, getLead, getEmployeeLeads, getLeadsStat, getLeads, filterLead, updateLead, archiveLead, deleteLead, deleteWholeCollection,  searchLead, } from '../controllers/lead.js'
import { verifyEmployee, verifyManager, verifyToken } from '../middleware/auth.js'
import Lead from '../models//lead.js'

const router = express.Router()

const verifyIsAllocatedTo = async (req, res, next) => {
    try {
        const { leadId } = req.params
        const findedLead = await Lead.findById(leadId)
        if (!Boolean(findedLead)) return next(createError(400, 'lead not exist'))

        if (findedLead.allocatedTo == req.user._id || req.user.role == ('manager' || 'super_admin')) next()
        else next(createError(401, "This lead is not allocated to you."))
    } catch (err) {
        next(createError(500, err.message))
    }
}


// GET
router.get('/get/single/:leadId', getLead)
router.get('/get/employee', verifyToken, verifyEmployee, getEmployeeLeads)
router.get('/get/all', verifyToken, verifyManager, getLeads)
router.get('/get/stats', verifyToken, verifyEmployee, getLeadsStat)
router.get('/search', verifyToken, searchLead)
router.get('/filter', verifyToken, filterLead)

// POST
router.post('/create/onsite', verifyToken, verifyEmployee, createOnsiteLead)
router.post('/create/online', verifyToken, createOnlineLead)
router.post('/create', verifyToken, createLead)

// PUT
router.put('/archive', verifyToken, verifyEmployee, archiveLead)
router.put('/update/:leadId', verifyToken, verifyEmployee, verifyIsAllocatedTo, updateLead)

// DELETE
router.delete('/delete/:leadId', verifyToken, verifyEmployee, verifyIsAllocatedTo, deleteLead)
router.delete('/delete-whole-collection', deleteWholeCollection)

export default router