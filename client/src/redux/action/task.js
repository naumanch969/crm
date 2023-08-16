import * as api from '../api'
import { start, end, error, getTasksReducer, getTaskReducer, createTaskReducer, updateTaskReducer, deleteTaskReducer, } from '../reducer/task'


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
export const updateTask = (taskId, taskData, setOpen) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.updateTask(taskId, taskData)
        dispatch(updateTaskReducer(data.result))
        setOpen(false)
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