import jwt from 'jsonwebtoken'
import { createError } from '../utils/error.js'

export const verifyToken = async (req, res, next) => {
    try {
        // const token = req.cookies.authtoken
        // const token = req.headers.authtoken
        // if (!token) return next(createError(401, 'token is required'))

        // const decodedData = await jwt.verify(token, process.env.JWT_SECRET)
        // req.user = decodedData

        next()
    } catch (err) {
        next(createError(500, err.message))

    }
}

export const verifyEmployee = (req, res, next) => {
    // verifyToken(req, res, () => {
    //     if (req.user.role == ('employee' || 'manager' || 'super-admin')) next()
    //     else next(createError(401, 'Only employee, manager and super-admin can access this route'))
    // })
}

export const verifySuperAdmin = (req, res, next) => {
    // verifyToken(rq, rs, () => {
    //     if (rq.user.role == 'super-admin') next()
    //     else next(createError(401, 'Only super-admin can access this route'))
    // })
}

export const verifyManager = (req, res, next) => {
    // verifyToken(req, res, () => {
    //     if (req.user.role == ('manager' || 'super-admin')) next()
    //     else next(createError(401, 'Only manager and super-admin can access this route'))
    // })
}
