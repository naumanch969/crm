import express from 'express'

import { getFollowUp, getFollowUps, getEmployeeFollowUps, createFollowUp, deleteFollowUp, deleteWholeCollection, getFollowUpsStats, getEmployeeFollowUpsStats } from '../controllers/followUp.js'
import { verifyEmployee, verifyToken } from '../middleware/auth.js'

const router = express.Router()

// GET
router.get('/get/single/:followUpId', verifyToken, verifyEmployee, getFollowUp)
router.get('/get/all/:leadId', verifyToken, verifyEmployee, getFollowUps)
router.get('/get/employee/:leadId', verifyToken, verifyEmployee, getEmployeeFollowUps)
router.get('/get/stats', verifyToken, getFollowUpsStats)
router.get('/get/stats/employee', verifyToken, verifyEmployee, getEmployeeFollowUpsStats)

// POST
router.post('/create', verifyToken, verifyEmployee, createFollowUp)

// DELETE
router.delete('/delete/:followUpId', verifyToken, verifyEmployee, deleteFollowUp)
router.delete('/delete-whole-collection', deleteWholeCollection)

export default router