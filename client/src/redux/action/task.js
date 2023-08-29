import * as api from '../api'
import { start, end, error, getTasksReducer, getTaskReducer, createTaskReducer, getArchivedTasksReducer, updateTaskReducer, deleteTaskReducer, } from '../reducer/task'


export const getTasks = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getTasks()
        dispatch(getTasksReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const getArchivedTasks = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getArchivedTasks()
        dispatch(getArchivedTasksReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const getTask = (taskId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getTask(taskId)
        dispatch(getTaskReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const createTask = (taskData, navigate) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.createTask(taskData)
        navigate('/tasks')
        dispatch(createTaskReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const searchTask = (searchTerm) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.searchTerm(searchTerm)
        dispatch(getTasksReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const filterTask = (filters) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.createTask(filters)
        dispatch(getTasksReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const updateTask = (taskId, taskData, options) => async (dispatch) => {
    try {
        !options?.loading ? null : dispatch(start())
        const { data } = await api.updateTask(taskId, taskData)
        dispatch(updateTaskReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const deleteTask = (taskId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.deleteTask(taskId)
        dispatch(deleteTaskReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}