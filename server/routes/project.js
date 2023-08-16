import express from 'express'
import { createProject, getProject, getProjects,getUserAssignedProjectsStat, updateProject, deleteProject, deleteWholeCollection } from '../controllers/project.js'
import { verifyEmployee, verifyManager, verifyToken } from '../middleware/auth.js'

const router = express.Router()

// GET
router.get('/get/single/:projectId', getProject)
router.get('/get/all', getProjects)//verifyToken, verifyEmployee,
router.get('/get/user_assigned_projects_stats', getUserAssignedProjectsStat)

// POST
router.post('/create', createProject)//verifyToken, verifyManager,

// PUT
router.put('/update/:projectId', updateProject)//verifyToken, verifyManager,

// DELETE
router.delete('/delete/:projectId', deleteProject)//verifyToken, verifyManager,
router.delete('/delete-whole-collection', deleteWholeCollection)

export default router