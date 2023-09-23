import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
    name: 'task',
    initialState: {
        isFetching: false,
        error: null,
        tasks: [],
        allTasks: [],
        currentTask: null,
    },
    reducers: {
        start: (state) => { state.isFetching = true; state.error = null; },
        end: (state) => { state.isFetching = false },
        error: (state, action) => { state.isFetching = false; state.error = action.payload; },
        getTasksReducer: (state, action) => { state.tasks = action.payload; state.allTasks = action.payload },
        getTaskReducer: (state, action) => { state.currentTask = action.payload },
        searchTaskReducer: (state, action) => {
            const { allTasks } = state;
            const { payload: searchTerm } = action;

            const searchedTasks = allTasks.filter((task) => {
                const itemValues = Object.values(task);
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
            state.tasks = searchedTasks;
        },
        filterTaskReducer: (state, action) => {
            const { allTasks } = state;
            const { payload: filters } = action;

            const filteredTasks = allTasks.filter((task) => {
                return Object.entries(filters).every(([key, filterValue]) => {
                    const taskValue = task[key];

                    if (Array.isArray(filterValue)) {
                        // Handle array filters (e.g., checking if taskValue is in filterValue)
                        return filterValue.includes(taskValue);
                    } else if (typeof filterValue === 'string') {
                        // Handle string filters (e.g., checking if taskValue includes filterValue)
                        return String(taskValue).toLowerCase().includes(filterValue.toLowerCase());
                    } else {
                        // Handle other types of filters (e.g., equality checks)
                        return taskValue === filterValue;
                    }
                });
            });

            state.tasks = filteredTasks;
        },

        createTaskReducer: (state, action) => { state.tasks = [action.payload, ...state.tasks] },
        updateTaskReducer: (state, action) => { state.tasks = state.tasks.map(t => t = t._id == action.payload._id ? action.payload : t) },
        deleteTaskReducer: (state, action) => { state.tasks = state.tasks.filter(t => t._id != action.payload._id) },
    }
})

export const {
    start,
    end,
    error,
    getTasksReducer,
    getTaskReducer,
    searchTaskReducer,
    filterTaskReducer,
    createTaskReducer,
    getArchivedTasksReducer,
    updateTaskReducer,
    unarchiveTaskReducer,
    deleteTaskReducer,
} = taskSlice.actions
export default taskSlice.reducer