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


        const findedInventory = await Inventory.find({ isArchived: false }).populate('project').exec()
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
                { sellerPhone: new RegExp(searchTerm, 'i') },
                { property: new RegExp(searchTerm, 'i') },
                { price: numberSearch }, // Search directly as a number
            ],
        };

        // Check if isArchived is provided in the request body
        if (isArchived !== undefined) {
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
    const { startingDate, endingDate, ...filters } = req.query;
    try {
        let query = await Inventory.find(filters).populate('project').exec();

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

        const newInventory = await Inventory.create(req.body)
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