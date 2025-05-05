import toast from 'react-hot-toast'
import * as api from '../api'
import { start, end, error, getInventoryReducer, getInventoriesReducer, createInventoryReducer, updateInventoryReducer, deleteInventoryReducer, } from '../reducer/inventory'
import { getUsersReducer } from '../reducer/user'


export const getInventory = (inventoryId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getInventory(inventoryId)
        dispatch(getInventoryReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const getInventories = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getInventories()
        dispatch(getInventoriesReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const getEmployeeInventories = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getEmployeeInventories()
        dispatch(getInventoriesReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
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
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const searchInventory = (searchTerm, isArchived) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.searchInventory(searchTerm, isArchived)
        dispatch(getInventoriesReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const filterInventory = (filters) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.filterInventory(filters)
        dispatch(getInventoriesReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const createInventory = (inventoryData, navigate) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.createInventory(inventoryData)
        dispatch(createInventoryReducer(data.result))
        navigate('/inventories')
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const updateInventory = (inventoryId, inventoryData) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.updateInventory(inventoryId, inventoryData)
        dispatch(updateInventoryReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const deleteInventory = (inventoryId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.deleteInventory(inventoryId)
        dispatch(deleteInventoryReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}