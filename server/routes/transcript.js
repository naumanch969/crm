import express from "express";
import { getTranscript, createtranscript, deleteTranscript, getTranscripts, updateTranscript } from "../controllers/transcript.js";
import { verifyEmployee, verifyManager, verifySuperAdmin, verifyToken } from '../middleware/auth.js'

const router = express.Router()

// GET
router.get('/get/single/:transcriptId', verifyToken, verifyEmployee, getTranscript, verifyManager)
router.get('/get/all', verifyToken, verifySuperAdmin, getTranscripts, verifyManager)

// POST
router.post('/create', verifyToken, verifyManager, verifySuperAdmin, createtranscript)

// PUT
router.put('/update/:transcriptId', verifyToken, verifyManager, verifySuperAdmin, updateTranscript)

// DELETE
router.delete('/delete/:transcriptId', deleteTranscript)

export default router