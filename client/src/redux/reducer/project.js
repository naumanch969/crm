import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
    name: 'project',
    initialState: {
        isFetching: false,
        error: null,
        projects: [],
        allProjects: [],
        stats: [],
        currentProject: null,
    },
    reducers: {
        start: (state) => { state.isFetching = true; state.error = null; },
        end: (state) => { state.isFetching = false },
        error: (state, action) => { state.isFetching = false; state.error = action.payload; },

        getProjectReducer: (state, action) => { state.currentProject = action.payload },
        getProjectsReducer: (state, action) => { state.projects = action.payload; state.allProjects = action.payload },
        searchProjectReducer: (state, action) => {
            const { allProjects } = state;
            const { payload: searchTerm } = action;

            const searchedProjects = allProjects.filter((project) => {
                const itemValues = Object.values(project);
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
            state.projects = searchedProjects;
        },
        filterProjectReducer: (state, action) => {
            const { allProjects } = state;
            const { payload: filters } = action;

            const filteredProjects = allProjects.filter((project) => {
                return Object.entries(filters).every(([key, filterValue]) => {
                    const projectValue = project[key];

                    if (Array.isArray(filterValue)) {
                        // Handle array filters (e.g., checking if projectValue is in filterValue)
                        return filterValue.includes(projectValue);
                    } else if (typeof filterValue === 'string') {
                        // Handle string filters (e.g., checking if projectValue includes filterValue)
                        return String(projectValue).toLowerCase().includes(filterValue.toLowerCase());
                    } else {
                        // Handle other types of filters (e.g., equality checks)
                        return projectValue === filterValue;
                    }
                });
            });

            state.projects = filteredProjects;
        },

        createProjectReducer: (state, action) => { state.projects = [action.payload, ...state.projects] },
        updateProjectReducer: (state, action) => { state.projects = state.projects.map(s => s = s._id == action.payload._id ? action.payload : s) },
        deleteProjectReducer: (state, action) => { state.projects = state.projects.filter(s => s._id != action.payload._id) },
    }
})

export const { start, end, error, getProjectReducer, getProjectsReducer, getUserAssignedProjectsStatsReducer, searchProjectReducer, filterProjectReducer, createProjectReducer, updateProjectReducer, deleteProjectReducer, } = projectSlice.actions
export default projectSlice.reducer