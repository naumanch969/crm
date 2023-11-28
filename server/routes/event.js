import express from 'express'

import { getEvent, getEmployeeEvents, getEvents, createEvent, updateEvent, deleteEvent, deleteWholeCollection } from '../controllers/event.js'
import { verifyEmployee, verifyToken } from '../middleware/auth.js'

const router = express.Router()

// GET
router.get('/get/single/:eventId', verifyToken, verifyEmployee, getEvent)
router.get('/get/all', verifyToken, verifyEmployee, getEvents)
router.get('/get/employee', verifyToken, verifyEmployee, getEmployeeEvents)

// POST
router.post('/create', verifyToken, verifyEmployee, createEvent)

// PUT
router.put('/update/:eventId', verifyToken, verifyEmployee, updateEvent)

// DELETE
router.delete('/delete/:eventId', verifyToken, verifyEmployee, deleteEvent)
router.delete('/delete-whole-collection', deleteWholeCollection)

export default router