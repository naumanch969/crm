import express from 'express'
import { getEvent, findOneEvent, createEvent, deleteEvent, updateEvent } from '../controllers/CalendarEvent'
import { verifyEmployee, verifyManager, verifyToken } from '../middleware/auth.js'

const router = express.Router()

// GET
router.get("/get/all/events", verifyToken, verifyEmployee,verifyManager, getEvent)
router.get("/:id/show", verifyToken, verifyEmployee,verifyManager, findOneEvent)

// POST
router.post("/", verifyToken, verifyEmployee,verifyManager, createEvent)

// PUT
router.put("/:id/update", verifyToken, verifyEmployee,verifyManager, updateEvent)

// DELETE
router.delete("/:id/delete", verifyToken, verifyEmployee,verifyManager, deleteEvent)

export default router