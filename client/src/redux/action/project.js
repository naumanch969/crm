import * as api from '../api'
import { start, end, error, getProjectReducer, getProjectsReducer, getUserAssignedProjectsStatsReducer, createProjectReducer, updateProjectReducer, deleteProjectReducer, } from '../reducer/project'


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