import User from '../models/user.js'
import Lead from '../models/lead.js'
import { createError } from '../utils/error.js'
import bcrypt from 'bcryptjs'


export const getUsers = async (req, res, next) => {
    try {

        const users = await User.find()
        res.status(200).json({ result: users, message: 'users fetched seccessfully', success: true })

    } catch (err) {
        next(createError(500, err.message))

    }
}

export const getUser = async (req, res, next) => {
    try {

        const { userId } = req.params
        const findedUser = await User.findById(userId)
        if (!findedUser) return next(createError(401, 'User not exist'))

        res.status(200).json({ result: findedUser, message: 'user fetched seccessfully', success: true })

    } catch (err) {
        next(createError(500, err.message))

    }
}

export const filterUser = async (req, res, next) => {
    const { startingDate, endingDate, ...filters } = req.query;
    try {
        let query = await User.find(filters)

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

            // Add createdAt filtering for endingDate
            if (query.model.modelName === 'User') { // Check if the query has not been executed yet
                query = query.where('createdAt').lte(endDate);
            }
        }
        if (query.length > 0) {
            query = await query.populate('userId').exec();
        }
        res.status(200).json({ result: query });

    } catch (error) {
        next(createError(500, error.message));
    }
};


export const getClients = async (req, res, next) => {
    try {

        const findedClients = await User.find({ role: 'client' })
        res.status(200).json({ result: findedClients, message: 'clients fetched seccessfully', success: true })

    } catch (err) {
        next(createError(500, err.message))

    }
}

export const getEmployeeClients = async (req, res, next) => {
    try {
        let allClients = await User.find({ role: 'client' })
        const employeeLeads = await Lead.find({ allocatedTo: { $in: req.user?._id }, isArchived: false })

        // Filter clients based on the condition
        allClients = allClients.filter((client) => {
            return employeeLeads.findIndex(lead => lead.clientPhone.toString() === client.phone.toString()) !== -1
        });

        res.status(200).json({ result: allClients, message: 'clients fetched successfully', success: true });
    } catch (err) {
        next(createError(500, err.message));
    }
};

export const getEmployees = async (req, res, next) => {
    try {

        const findedEmployees = await User.find({ role: 'employee' })
        res.status(200).json({ result: findedEmployees, message: 'employees fetched seccessfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const createClient = async (req, res, next) => {
    try {

        const findedUser = await User.findOne({ email: req.body.email })
        if (Boolean(findedUser)) return next(createError(400, 'Email already exist'))

        const result = await User.create({ ...req.body, role: 'client' })
        res.status(200).json({ result, message: 'client created seccessfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}
export const createEmployee = async (req, res, next) => {
    try {

        const findedUser = await User.findOne({ username: req.body.username })
        if (Boolean(findedUser)) return next(createError(400, 'Username already exist'))

        const { password } = req.body
        const hashedPassword = await bcrypt.hash(password, 12)

        const result = await User.create({ ...req.body, password: hashedPassword, role: 'employee' })
        res.status(200).json({ result, message: 'employee created seccessfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const updateRole = async (req, res, next) => {
    try {

        const { userId } = req.params
        const { role } = req.body

        const findedUser = await User.findById(userId)
        if (!findedUser) return next(createError(401, 'User not exist'))

        const updatedUser = await User.findByIdAndUpdate(userId, { role }, { new: true })
        res.status(200).json({ reuslt: updatedUser, message: 'Role updated successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const updateUser = async (req, res, next) => {
    try {

        const { userId } = req.params
        const findedUser = await User.findById(userId)
        if (!findedUser) return next(createError(400, 'User not exist'))

        const { _id, ...body } = req.body
        const updatedUser = await User.findByIdAndUpdate(userId, { $set: body }, { new: true })
        res.status(200).json({ result: updatedUser, message: 'User updated successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))

    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const { userId } = req.params
        const findedUser = await User.findById(userId)
        if (!findedUser) return next(createError(400, 'User not exist'))

        const deletedUser = await User.findByIdAndDelete(userId)
        res.status(200).json({ result: deletedUser, message: 'User deleted successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const deleteWholeCollection = async (req, res, next) => {
    try {

        const result = await User.deleteMany()
        res.status(200).json({ result, message: 'User collection deleted successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}
