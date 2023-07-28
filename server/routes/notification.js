import express from 'express'

import { getNotification, getNotifications, createRequestNotification, deleteNotification, deleteWholeCollection } from '../controllers/notification.js'

const router = express.Router()

// GET
router.get('/get/single/:approvalId', getNotification)
router.get('/get/all', getNotifications)

// POST
router.get('/create/request', createRequestNotification)

// DELETE
router.delete('/delete/:notificationId', deleteNotification)
router.delete('/delete/whole-collection', deleteWholeCollection)

export default router