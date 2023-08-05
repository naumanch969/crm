import * as api from '../api'
import { start, end, error, registerReducer, loginReducer, logoutReducer, getUserReducer, getClientsReducer, getEmployeesReducer, updateRoleReducer, updateUserReducer, deleteUserReducer, } from '../reducer/user'


export const register = (userData) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.register(userData)
        console.log('register data', data)
        dispatch(registerReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const login = (userData) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.login(userData)
        console.log('login data', data)
        const { token, ...result } = data.result
        dispatch(loginReducer(result))
        Cookies.set('profile', token)
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const logout = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.logout()
        dispatch(logoutReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const getClients = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getClients()
        dispatch(getClientsReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const getEmployees = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getEmployees()
        dispatch(getEmployeesReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const getUser = (userId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getUser(userId)
        dispatch(getUserReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const updateRole = (userId, role) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.updateRole(userId, role)
        dispatch(updateUserReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const updateUser = (userId, userData,role) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.updateUser(userId, userData)
        dispatch(updateUserReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const deleteUser = (userId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.deleteUser(userId)
        dispatch(deleteUserReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}