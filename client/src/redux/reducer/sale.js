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
                if (filters.staff && sale.staff.toLowerCase() != filters.staff.toLowerCase()) return false;
                if (filters.top && sale.top.toLowerCase() != filters.top.toLowerCase()) return false;
                if (filters.minNet && Number(sale.net) < filters.minNet) return false;
                if (filters.maxNet && Number(sale.net) > filters.maxNet) return false;
                if (filters.minReceived && Number(sale.received) < filters.minReceived) return false;
                if (filters.maxReceived && Number(sale.received) > filters.maxReceived) return false;
                if (filters.minProfit && (Number(sale.net) - Number(sale.received)) < filters.minProfit) return false;
                if (filters.maxProfit && (Number(sale.net) - Number(sale.received)) > filters.maxProfit) return false;
                if (filters.startingDate && new Date(sale.createdAt) < new Date(filters.startingDate)) return false;
                if (filters.endingDate && new Date(sale.createdAt) > new Date(filters.endingDate)) return false;
                return true;
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