import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
    name: 'project',
    initialState: {
        isFetching: false,
        error: null,
        projects: [],
        currentproject: null,
    },
    reducers: {
        start: (state) => { state.isFetching = true; state.error = null; },
        end: (state) => { state.isFetching = false },
        error: (state, action) => { state.isFetching = false; state.error = action.payload; },

        getProjectReducer: (state, action) => { state.currentProject = action.payload },
        getProjectsReducer: (state, action) => { state.projects = action.payload },
        createProjectReducer: (state, action) => { state.projects = [...state.projects, action.payload] },
        updateProjectReducer: (state, action) => { state.projects = state.projects.map(s => s = s._id == action.payload._id ? action.payload : s) },
        deleteProjectReducer: (state, action) => { state.projects = state.projects.filter(s => s._id != action.payload._id) },

    }
})

export const { start, end, error, getProjectReducer, getProjectsReducer, createProjectReducer, updateProjectReducer, deleteProjectReducer, } = projectSlice.actions
export default projectSlice.reducer