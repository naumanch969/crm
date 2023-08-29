import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
    name: 'task',
    initialState: {
        isFetching: false,
        error: null,
        tasks: [],
        archived: [],
        currentTask: null,
    },
    reducers: {
        start: (state) => { state.isFetching = true; state.error = null; },
        end: (state) => { state.isFetching = false },
        error: (state, action) => { state.isFetching = false; state.error = action.payload; },
        getTasksReducer: (state, action) => { state.tasks = action.payload },
        getArchivedTasksReducer: (state, action) => { state.archived = action.payload },
        getTaskReducer: (state, action) => { state.currentTask = action.payload },
        createTaskReducer: (state, action) => { state.tasks = [action.payload, ...state.tasks] },
        updateTaskReducer: (state, action) => { state.tasks = state.tasks.map(t => t = t._id == action.payload._id ? action.payload : t) },
        archiveTaskReducer: (state, action) => {
            const task = action.payload
            state.tasks = state.tasks.filter(l => l._id != task._id)
            state.archived = state.archived.concat(task);
        },
        unarchiveTaskReducer: (state, action) => {
            const task = action.payload
            state.archived = state.archived.filter(l => l._id != task._id)
            state.tasks = state.tasks.concat(task);
        },
        deleteTaskReducer: (state, action) => { state.tasks = state.tasks.filter(t => t._id != action.payload._id) },
    }
})

export const {
    start,
    end,
    error,
    getTasksReducer,
    getTaskReducer,
    createTaskReducer,
    getArchivedTasksReducer,
    updateTaskReducer,
    archiveTaskReducer,
    unarchiveTaskReducer,
    deleteTaskReducer,
} = taskSlice.actions
export default taskSlice.reducer