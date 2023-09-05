import * as api from '../api'
import { start, end, error, getProjectReducer, getProjectsReducer, getUserAssignedProjectsStatsReducer, createProjectReducer, updateProjectReducer, deleteProjectReducer, } from '../reducer/project'
import { getUsersReducer } from '../reducer/user'


export const getProject = (projectId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getProject(projectId)
        dispatch(getProjectReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const getProjects = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getProjects()
        dispatch(getProjectsReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const getArchivedProjects = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getArchivedProjects()
        dispatch(getArchivedProjects(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const getUsers = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getUsers()
        dispatch(getUsersReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const searchProject = (searchTerm) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.searchProject(searchTerm)
        dispatch(getProjectsReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const filterProject = (filters) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.filterProject(filters)
        console.log(data.result)
        dispatch(getProjectsReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const getUserAssignedProjectsStats = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getUserAssignedProjectsStats()
        dispatch(getUserAssignedProjectsStatsReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const createProject = (projectData, navigate) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.createProject(projectData)
        dispatch(createProjectReducer(data.result))
        navigate('/projects')
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const updateProject = (projectId, projectData) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.updateProject(projectId, projectData)
        dispatch(updateProjectReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const deleteProject = (projectId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.deleteProject(projectId)
        dispatch(deleteProjectReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}