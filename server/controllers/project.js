import Project from '../models/project.js'
import { createError } from '../utils/error.js'


export const getProject = async (req, res, next) => {
    try {

        const { projectId } = req.params
        const findedProject = await Project.findById(projectId)
        if (!findedProject) return next(createError(400, 'Project not exist'))

        res.status(200).json({ result: findedProject, message: 'project created successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const getProjects = async (req, res, next) => {
    try {

        const { new: new_query } = req.query

        const findedProject = new_query ? await Project.find().sort({ createdAt: -1 }).limit(10) : await Project.find()
        res.status(200).json({ result: findedProject, message: 'projects fetched successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const getUserAssignedProjectsStat = async (req, res, next) => {
    try {

        const userId = req.user?._id || '64d72779e91cd595455e8e06'

        const projects = await Project.find({ assignedTo: userId });

        const statusEnum = ['Not Started', 'Completed', 'In Progress', 'On Hold'];
        const projectsStatArray = statusEnum.map(status => {
            const count = projects.filter(project => project.status === status).length;
            return {
                action: status,
                assigned: count,
            };
        });

        res.status(200).json({ result: projectsStatArray, message: 'User projects stats fetched successfully', success: true });
    } catch (err) {
        next(createError(500, err.message))
    }
}

export const createProject = async (req, res, next) => {
    try {

        const { city, region, propertyType, homeType, price, area, areaUnit, priority, beds } = req.body
        if (!city || !region || !propertyType || !homeType || !price || !area || !areaUnit || !priority || !beds)
            return next(createError(400, 'Make sure to provide all the fields'))

        const newProject = await Project.create(req.body)
        res.status(200).json({ result: newProject, message: 'project created successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const updateProject = async (req, res, next) => {
    try {

        const { projectId } = req.params
        const findedProject = await Project.findById(projectId)
        if (!findedProject) return next(createError(400, 'Project not exist'))

        const updatedProject = await Project.findByIdAndUpdate(projectId, { $set: req.body }, { new: true })
        res.status(200).json({ result: updatedProject, message: 'project updated successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const deleteProject = async (req, res, next) => {
    try {

        const { projectId } = req.params
        const findedProject = await Project.findById(projectId)
        if (!findedProject) return next(createError(400, 'Project not exist'))

        const deletedProject = await Project.findByIdAndDelete(projectId)
        res.status(200).json({ result: deletedProject, message: 'project deleted successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const deleteWholeCollection = async (req, res, next) => {
    try {

        const result = await Project.deleteMany()
        res.status(200).json({ result, message: 'Project collection deleted successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}