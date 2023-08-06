import express from 'express'

import { getMeeting, getMeetings, createMeeting, updateMeeting, deleteMeeting, deleteWholeCollection } from '../controllers/meeting.js'
import { verifyEmployee, verifyToken } from '../middleware/auth.js'

const router = express.Router()

// GET
router.get('/get/single/:meetingId',  getMeeting)//verifyToken, verifyEmployee,
router.get('/get/all',  getMeetings)//verifyToken, verifyEmployee,

// POST
router.post('/create',  createMeeting)//verifyToken, verifyEmployee,

// PUT
router.put('/update/:meetingId',  updateMeeting)//verifyToken, verifyEmployee,

// DELETE
router.delete('/delete/:meetingId',  deleteMeeting)//verifyToken, verifyEmployee,
router.delete('/delete-whole-collection', deleteWholeCollection)

export default router