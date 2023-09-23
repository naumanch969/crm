import { createSlice } from "@reduxjs/toolkit";

const saleSlice = createSlice({
    name: 'sale',
    initialState: {
        isFetching: false,
        error: null,
        sales: [],
        allSales: [],
        currentSale: null,
    },
    reducers: {
        start: (state) => { state.isFetching = true; state.error = null; },
        end: (state) => { state.isFetching = false },
        error: (state, action) => { state.isFetching = false; state.error = action.payload; },
        getSaleReducer: (state, action) => { state.currentSale = action.payload },
        getSalesReducer: (state, action) => { state.sales = action.payload; state.allSales = action.payload },
        searchSaleReducer: (state, action) => {
            const { allSales } = state;
            const { payload: searchTerm } = action;

            const searchedSales = allSales.filter((sale) => {
                const itemValues = Object.values(sale);
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
            state.sales = searchedSales;
        },
        filterSaleReducer: (state, action) => {
            const { allSales } = state;
            const { payload: filters } = action;

            const filteredSales = allSales.filter((sale) => {
                return Object.entries(filters).every(([key, filterValue]) => {
                    const saleValue = sale[key];

                    if (Array.isArray(filterValue)) {
                        // Handle array filters (e.g., checking if saleValue is in filterValue)
                        return filterValue.includes(saleValue);
                    } else if (typeof filterValue === 'string') {
                        // Handle string filters (e.g., checking if saleValue includes filterValue)
                        return String(saleValue).toLowerCase().includes(filterValue.toLowerCase());
                    } else {
                        // Handle other types of filters (e.g., equality checks)
                        return saleValue === filterValue;
                    }
                });
            });

            state.sales = filteredSales;
        },

        createSaleReducer: (state, action) => { state.sales = [action.payload, ...state.sales] },
        updateSaleReducer: (state, action) => { state.sales = state.sales.map(s => s = s._id == action.payload._id ? action.payload : s) },
        deleteSaleReducer: (state, action) => { state.sales = state.sales.filter(s => s._id != action.payload._id) },
    }
})

export const { start, end, error, getSaleReducer, getSalesReducer, searchSaleReducer, filterSaleReducer, createSaleReducer, updateSaleReducer, deleteSaleReducer, } = saleSlice.actions
export default saleSlice.reducer