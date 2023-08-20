import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const usersSlice = createSlice({
    name: 'user',
    initialState: {
        isFetching: false,
        error: null,
        users: [],
        employees: [],
        clients: [],
        currentEmployee: null,
        loggedUser: Cookies.get('crm_profile') ? JSON.parse(Cookies.get('crm_profile')) : null
    },
    reducers: {
        start: (state) => { state.isFetching = true; state.error = null; },
        end: (state) => { state.isFetching = false },
        error: (state, action) => { state.isFetching = false; state.error = action.payload; },

        registerReducer: (state, action) => { state.clients = [action.payload, ...state.clients] },
        loginReducer: (state, action) => { state.loggedUser = action.payload },
        logoutReducer: (state) => { state.loggedUser = null },

        getUsersReducer: (state, action) => { state.users = action.payload },
        getEmployeesReducer: (state, action) => { state.employees = action.payload },
        getClientsReducer: (state, action) => { state.clients = action.payload },
        getUserReducer: (state, action) => { state.currentEmployee = action.payload },

        createClientReducer: (state, action) => { state.clients = [action.payload, ...state.clients] },
        createEmployeeReducer: (state, action) => { state.clients = [action.payload, ...state.clients] },

        updateUserReducer: (state, action) => {
            switch (action.payload.role) {
                case 'client':
                    state.clients = state.clients.map(c => c = c._id == action.payload._id ? action.payload : c)
                    break;
                case 'employee':
                    state.employees = state.employees.map(e => e = e._id == action.payload._id ? action.payload : e)
                    break;
                default:
                    break;
            }
        },
        deleteUserReducer: (state, action) => {
            switch (action.payload.role) {
                case 'client':
                    state.clients = state.clients.filter(c => c._id != action.payload._id)
                    break;
                case 'employee':
                    state.employees = state.employees.filter(e => e._id != action.payload._id)
                    break;
                default:
                    break;
            }
        },


    }
})

export const { start, end, error,
    getUsersReducer, getEmployeesReducer, getClientsReducer,
    registerReducer, loginReducer, logoutReducer, createClientReducer, createEmployeeReducer, getUserReducer, updateUserReducer, deleteUserReducer,
} = usersSlice.actions
export default usersSlice.reducer