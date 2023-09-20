import { createSlice } from "@reduxjs/toolkit";

const inventorySlice = createSlice({
    name: 'inventory',
    initialState: {
        isFetching: false,
        error: null,
        inventories: [],
        stats: [],
        currentInventory: null,
    },
    reducers: {
        start: (state) => { state.isFetching = true; state.error = null; },
        end: (state) => { state.isFetching = false },
        error: (state, action) => { state.isFetching = false; state.error = action.payload; },

        getInventoryReducer: (state, action) => { state.currentInventory = action.payload },
        getInventoriesReducer: (state, action) => { state.inventories = action.payload },
        createInventoryReducer: (state, action) => { state.inventories = [action.payload, ...state.inventories] },
        updateInventoryReducer: (state, action) => { state.inventories = state.inventories.map(s => s = s._id == action.payload._id ? action.payload : s) },
        deleteInventoryReducer: (state, action) => { state.inventories = state.inventories.filter(s => s._id != action.payload._id) },
    }
})

export const { start, end, error, getInventoryReducer, getInventoriesReducer, archiveInventoryReducer, unarchiveInventoryReducer, getUserAssignedInventoriesStatsReducer, createInventoryReducer, updateInventoryReducer, deleteInventoryReducer, } = inventorySlice.actions
export default inventorySlice.reducer