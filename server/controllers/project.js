import Project from '../models/project.js'
import Society from '../models/society.js'
import { createError, isValidDate } from '../utils/error.js'


export const getProject = async (req, res, next) => {
    try {

        const { projectId } = req.params
        const findedProject = await Project.findById(projectId).populate('society').exec()
        if (!findedProject) return next(createError(400, 'Project not exist'))

        res.status(200).json({ result: findedProject, message: 'project created successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const getProjects = async (req, res, next) => {
    try {

        const findedProject = await Project.find().populate('society').exec()
        res.status(200).json({ result: findedProject, message: 'projects fetched successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}
export const searchProject = async (req, res, next) => {
    const { searchTerm } = req.query;
    const { isArchived } = req.body;

    try {
        // Create an object to filter project documents
        const projectFilter = {
            $or: [
                { title: new RegExp(searchTerm, 'i') },
                { description: new RegExp(searchTerm, 'i') },
                { city: new RegExp(searchTerm, 'i') },
            ],
        };

        // Check if isArchived is provided in the request body
        if (isArchived) {
            projectFilter.isArchived = isArchived; // Filter by isArchived field
        }

        const searchResults = await Project.find(projectFilter)
            .populate('society')
            .exec();

        res.status(200).json({ result: searchResults });
    } catch (error) {
        next(createError(500, error.message));
    }
};


export const filterProject = async (req, res, next) => {
    const { startingDate, endingDate, society, ...filters } = req.query;

    try {
        let query = Project.find(filters);

        // Check if startingDate is provided and valid
        if (startingDate && isValidDate(startingDate)) {
            const startDate = new Date(startingDate);
            startDate.setHours(0, 0, 0, 0);

            // Add createdAt filtering for startingDate
            query = query.where('createdAt').gte(startDate);
        }

        // Check if endingDate is provided and valid
        if (endingDate && isValidDate(endingDate)) {
            const endDate = new Date(endingDate);
            endDate.setHours(23, 59, 59, 999);
            query = query.where('createdAt').lte(endDate);
        }

        // Check if society is provided and filter by the title of the referenced document
        if (society) {
            query = query.where('society').in(await Society.find({ title: new RegExp(society, 'i') }).select('_id').exec());
        }

        query = await query.populate('society').exec();

        res.status(200).json({ result: query });
    } catch (error) {
        next(createError(500, error.message));
    }
};


export const createProject = async (req, res, next) => {
    try {

        const { title, description, city, society } = req.body
        if (!title || !description || !city || !society) return next(createError(400, 'Make sure to provide all the fields'))

        const createdProject = await Project.create(req.body)
        const newProject = await Project.findById(createdProject._id).populate('society').exec();
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