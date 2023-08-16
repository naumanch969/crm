import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isFetching: false,
        error: null,
        employees: [],
        clients: [],
        currentUser: null,
        loggedUser: null
    },
    reducers: {
        start: (state) => { state.isFetching = true; state.error = null; },
        end: (state) => { state.isFetching = false },
        error: (state, action) => { state.isFetching = false; state.error = action.payload; },
        registerReducer: (state, action) => { state.clients = [action.payload, ...state.clients] },
        loginReducer: (state, action) => { state.loggedUser = action.payload },
        logoutReducer: (state, action) => { state.loggedUser = null },
        getUserReducer: (state, action) => { state.currentUser = action.payload },
        getClientsReducer: (state, action) => { state.clients = action.payload },
        getEmployeesReducer: (state, action) => { state.employees = action.payload },
        createClientReducer: (state, action) => { state.clients = [action.payload, ...state.clients] },
        createEmployeeReducer: (state, action) => { state.employees = [action.payload, ...state.employees] },
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

export const { start, end, error, registerReducer, loginReducer, logoutReducer, getUsersReducer, getUserReducer, getClientsReducer, getEmployeesReducer, createEmployeeReducer, createClientReducer, updateRoleReducer, updateUserReducer, deleteUserReducer, } = userSlice.actions
export default userSlice.reducer