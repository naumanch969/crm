import User from '../models/user.js'
import { createError } from '../utils/error.js'


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

export const getClients = async (req, res, next) => {
    try {

        const findedClients = await User.find({ role: 'client' })
        res.status(200).json({ result: findedClients, message: 'clients fetched seccessfully', success: true })

    } catch (err) {
        next(createError(500, err.message))

    }
}

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
        res.status(200).json({ result, message: 'employees fetched seccessfully', success: true })

    } catch (err) {
        next(createError(500, err.message))

    }
}
export const createEmployee = async (req, res, next) => {
    try {

        const findedUser = await User.findOne({ email: req.body.email })
        if (Boolean(findedUser)) return next(createError(400, 'Email already exist'))

        const result = await User.create({ ...req.body, role: 'employee' })
        res.status(200).json({ result, message: 'employees fetched seccessfully', success: true })

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
