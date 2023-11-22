import Project from '../models/project.js'
import Inventory from '../models/inventory.js'
import { createError, isValidDate } from '../utils/error.js'


export const getInventory = async (req, res, next) => {
    try {

        const { inventoryId } = req.params
        const findedInventory = await Inventory.findById(inventoryId).populate('project').exec()
        if (!findedInventory) return next(createError(400, 'Inventory not exist'))

        res.status(200).json({ result: findedInventory, message: 'inventory created successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const getInventories = async (req, res, next) => {
    try {

        const findedInventory = await Inventory.find({ isArchived: false }).populate('project').populate('employeeId').exec()
        res.status(200).json({ result: findedInventory, message: 'inventories fetched successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const getEmployeeInventories = async (req, res, next) => {
    try {

        const findedInventory = await Inventory.find({ isArchived: false, employeeId: req.user._id }).populate('project').exec()
        res.status(200).json({ result: findedInventory, message: 'inventories fetched successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const searchInventory = async (req, res, next) => {
    const { searchTerm } = req.query;
    const { isArchived } = req.body;

    try {
        // Convert searchTerm to a number (if applicable)
        const numberSearch = !isNaN(searchTerm) ? Number(searchTerm) : undefined;

        // Create an object to filter inventory documents
        const inventoryFilter = {
            $or: [
                { sellerName: new RegExp(searchTerm, 'i') },
                { sellerEmail: new RegExp(searchTerm, 'i') },
                { sellerCompamyName: new RegExp(searchTerm, 'i') },
                { sellerCity: new RegExp(searchTerm, 'i') },
                { remarks: new RegExp(searchTerm, 'i') },
                { propertyStreetNumber: numberSearch },
                { propertyNumber: numberSearch },
                { price: numberSearch },
                { sellerPhone: numberSearch },
            ],
        };

        // Check if isArchived is provided in the request body
        if (isArchived != undefined) {
            inventoryFilter.isArchived = isArchived; // Filter by isArchived field
        }

        const searchResults = await Inventory.find(inventoryFilter)
            .populate('project')
            .exec();

        res.status(200).json({ result: searchResults });
    } catch (error) {
        next(createError(500, error.message));
    }
};


export const filterInventory = async (req, res, next) => {
    const { startingDate, endingDate, minPrice, maxPrice, project, ...filters } = req.query;

    try {
        let query = Inventory.find(filters);

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

        // Check if minPrice and maxPrice are provided
        if (minPrice != undefined && maxPrice != undefined) {
            // Filter by price within the specified range
            query = query.where('price').gte(Number(minPrice)).lte(Number(maxPrice));
        } else if (minPrice != undefined) {
            // Filter by minimum price
            query = query.where('price').gte(Number(minPrice));
        } else if (maxPrice != undefined) {
            // Filter by maximum price
            query = query.where('price').lte(Number(maxPrice));
        }

        // Check if project is provided and filter by the title of the referenced document
        if (project) {
            query = query.where('project').in(await Project.find({ title: new RegExp(project, 'i') }).select('_id').exec());
        }

        query = await query.populate('project').exec();

        res.status(200).json({ result: query });
    } catch (error) {
        next(createError(500, error.message));
    }
};

export const createInventory = async (req, res, next) => {
    try {

        const { sellerName, sellerPhone, sellerCity, project, propertyStreetNumber, propertyNumber, price, remarks, } = req.body
        if (!sellerName || !sellerPhone || !sellerCity || !project || !propertyStreetNumber || !propertyNumber || !price || !remarks)
            return next(createError(400, 'Make sure to provide all the fields'))

        const createdInventory = await Inventory.create({ ...req.body, employeeId: req.user._id })
        const newInventory = await Inventory.findById(createdInventory._id).populate('project').exec();
        res.status(200).json({ result: newInventory, message: 'inventory created successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const updateInventory = async (req, res, next) => {
    try {

        const { inventoryId } = req.params
        const findedInventory = await Inventory.findById(inventoryId)
        if (!findedInventory) return next(createError(400, 'Inventory not exist'))

        const updatedInventory = await Inventory.findByIdAndUpdate(inventoryId, { $set: req.body }, { new: true }).populate('project').exec()
        res.status(200).json({ result: updatedInventory, message: 'inventory updated successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const deleteInventory = async (req, res, next) => {
    try {

        const { inventoryId } = req.params
        const findedInventory = await Inventory.findById(inventoryId)
        if (!findedInventory) return next(createError(400, 'Inventory not exist'))

        const deletedInventory = await Inventory.findByIdAndDelete(inventoryId)
        res.status(200).json({ result: deletedInventory, message: 'inventory deleted successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const deleteWholeCollection = async (req, res, next) => {
    try {

        const result = await Inventory.deleteMany()
        res.status(200).json({ result, message: 'Inventory collection deleted successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}