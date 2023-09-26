import Society from '../models/society.js'
import { createError, isValidDate } from '../utils/error.js'


export const getSociety = async (req, res, next) => {
    try {

        const { societyId } = req.params
        const findedSociety = await Society.findById(societyId)
        if (!findedSociety) return next(createError(400, 'Society not exist'))

        res.status(200).json({ result: findedSociety, message: 'society created successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const getSocieties = async (req, res, next) => {
    try {

        const { new: new_query } = req.query

        const findedSociety = await Society.find()
        res.status(200).json({ result: findedSociety, message: 'societies fetched successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const searchSociety = async (req, res, next) => {
    const { searchTerm } = req.query;
    const { isArchived } = req.body;

    try {
        // Create an object to filter society documents
        const societyFilter = {
            $or: [
                { title: new RegExp(searchTerm, 'i') },
                { description: new RegExp(searchTerm, 'i') },
            ],
        };

        // Check if isArchived is provided in the request body
        if (isArchived != undefined) {
            societyFilter.isArchived = isArchived; // Filter by isArchived field
        }

        const searchResults = await Society.find(societyFilter).exec();

        res.status(200).json({ result: searchResults });
    } catch (error) {
        next(createError(500, error.message));
    }
};


export const filterSociety = async (req, res, next) => {
    const { startingDate, endingDate, ...filters } = req.query;
    try {
        let query = Society.find(filters);

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

        query = await query.exec();

        res.status(200).json({ result: query });

    } catch (error) {
        next(createError(500, error.message));
    }
};

export const createSociety = async (req, res, next) => {
    try {

        const { title, description } = req.body
        if (!title || !description) return next(createError(400, 'Title and Description fields are require'))

        const newSociety = await Society.create(req.body)
        res.status(200).json({ result: newSociety, message: 'society created successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const updateSociety = async (req, res, next) => {
    try {

        const { societyId } = req.params
        const findedSociety = await Society.findById(societyId)
        if (!findedSociety) return next(createError(400, 'Society not exist'))

        const updatedSociety = await Society.findByIdAndUpdate(societyId, { $set: req.body }, { new: true })
        res.status(200).json({ result: updatedSociety, message: 'society updated successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const deleteSociety = async (req, res, next) => {
    try {

        const { societyId } = req.params
        const findedSociety = await Society.findById(societyId)
        if (!findedSociety) return next(createError(400, 'Society not exist'))

        const deletedSociety = await Society.findByIdAndDelete(societyId)
        res.status(200).json({ result: deletedSociety, message: 'society deleted successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const deleteWholeCollection = async (req, res, next) => {
    try {

        const result = await Society.deleteMany()
        res.status(200).json({ result, message: 'Society collection deleted successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}