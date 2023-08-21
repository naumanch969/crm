import express from 'express'
import { createProject, getProject, getProjects, getUserAssignedProjectsStat, updateProject, deleteProject, deleteWholeCollection } from '../controllers/project.js'
import { verifyEmployee, verifyManager, verifyToken } from '../middleware/auth.js'

const router = express.Router()

// GET
router.get('/get/single/:projectId', verifyToken, getProject)
router.get('/get/all', verifyToken, verifyEmployee, getProjects)
router.get('/get/user_assigned_projects_stats', verifyToken, verifyEmployee, getUserAssignedProjectsStat)

// POST
router.post('/create', verifyToken, verifyManager, createProject)

// PUT
router.put('/update/:projectId', verifyToken, verifyManager, updateProject)

// DELETE
router.delete('/delete/:projectId', verifyToken, verifyManager, deleteProject)
router.delete('/delete-whole-collection', deleteWholeCollection)

export default router