import express from 'express'

import { getMeeting, getMeetings, createMeeting, updateMeeting, deleteMeeting, deleteWholeCollection } from '../controllers/meeting.js'
import { verifyEmployee, verifyToken } from '../middleware/auth.js'

const router = express.Router()

// GET
router.get('/get/single/:meetingId', verifyToken, verifyEmployee, getMeeting)
router.get('/get/all', verifyToken, verifyEmployee, getMeetings)

// POST
router.post('/create', verifyToken, verifyEmployee, createMeeting)

// PUT
router.put('/update/:meetingId', verifyToken, verifyEmployee, updateMeeting)

// DELETE
router.delete('/delete/:meetingId', verifyToken, verifyEmployee, deleteMeeting)
router.delete('/delete-whole-collection', deleteWholeCollection)

export default router