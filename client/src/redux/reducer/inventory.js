import { createSlice } from "@reduxjs/toolkit";

const inventorySlice = createSlice({
    name: 'inventory',
    initialState: {
        isFetching: false,
        error: null,
        allInventories: [],
        inventories: [],
        stats: [],
        currentInventory: null,
    },
    reducers: {
        start: (state) => { state.isFetching = true; state.error = null; },
        end: (state) => { state.isFetching = false },
        error: (state, action) => { state.isFetching = false; state.error = action.payload; },

        getInventoryReducer: (state, action) => { state.currentInventory = action.payload },
        getInventoriesReducer: (state, action) => { state.inventories = action.payload; state.allInventories = action.payload },
        searchInventoryReducer: (state, action) => {
            const { allInventories } = state;
            const { payload: searchTerm } = action;

            const searchedInventories = allInventories.filter((inventory) => {
                const itemValues = Object.values(inventory);
                return itemValues.some((value) => {
                    if (typeof value === 'object') {
                        const subItemValues = Object.values(value);
                        return subItemValues.some((subValue) =>
                            String(subValue).toLowerCase().includes(searchTerm.toLowerCase())
                        );
                    } else {
                        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
                    }
                });
            });
            state.inventories = searchedInventories;
        },
        filterInventoryReducer: (state, action) => {
            const { allInventories } = state;
            const { payload: filters } = action;

            const filteredInventories = allInventories.filter((inventory) => {
                return Object.entries(filters).every(([key, filterValue]) => {
                    const inventoryValue = inventory[key];

                    if (Array.isArray(filterValue)) {
                        // Handle array filters (e.g., checking if inventoryValue is in filterValue)
                        return filterValue.includes(inventoryValue);
                    } else if (typeof filterValue === 'string') {
                        // Handle string filters (e.g., checking if inventoryValue includes filterValue)
                        return String(inventoryValue).toLowerCase().includes(filterValue.toLowerCase());
                    } else {
                        // Handle other types of filters (e.g., equality checks)
                        return inventoryValue === filterValue;
                    }
                });
            });

            state.inventories = filteredInventories;
        },

        createInventoryReducer: (state, action) => { state.inventories = [action.payload, ...state.inventories] },
        updateInventoryReducer: (state, action) => { state.inventories = state.inventories.map(s => s = s._id == action.payload._id ? action.payload : s) },
        deleteInventoryReducer: (state, action) => { state.inventories = state.inventories.filter(s => s._id != action.payload._id) },
    }
})

export const { start, end, error, getInventoryReducer, getInventoriesReducer, searchInventoryReducer, filterInventoryReducer, archiveInventoryReducer, unarchiveInventoryReducer, getUserAssignedInventoriesStatsReducer, createInventoryReducer, updateInventoryReducer, deleteInventoryReducer, } = inventorySlice.actions
export default inventorySlice.reducer