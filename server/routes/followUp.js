import express from 'express'

import { getFollowUp, getFollowUps, createFollowUp, deleteFollowUp, deleteWholeCollection, } from '../controllers/followUp.js'
import { verifyEmployee, verifyToken } from '../middleware/auth.js'

const router = express.Router()

// GET
router.get('/get/single/:followUpId', verifyToken, verifyEmployee, getFollowUp)
router.get('/get/all/:leadId', verifyToken, verifyEmployee, getFollowUps)

// POST
router.post('/create', verifyToken, verifyEmployee, createFollowUp)

// DELETE
router.delete('/delete/:followUpId', verifyToken, verifyEmployee, deleteFollowUp)
router.delete('/delete-whole-collection', deleteWholeCollection)

export default router