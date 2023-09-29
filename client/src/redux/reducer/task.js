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
                if (filters.completedTask && task.completedTask.toLowerCase() != filters.completedTask.toLowerCase()) return false;
                if (filters.completedTaskStatus && task.completedTaskStatus.toLowerCase() != filters.completedTaskStatus.toLowerCase()) return false;
                if (filters.startingCompletedTaskDate && new Date(task.completedTaskDate) < new Date(filters.startingCompletedTaskDate)) return false;
                if (filters.endingCompletedTaskDate && new Date(task.completedTaskDate) > new Date(filters.endingCompletedTaskDate)) return false;

                if (filters.newTask && task.newTask.toLowerCase() != filters.newTask.toLowerCase()) return false;
                if (filters.startingNewTaskDeadline && new Date(task.newTaskDeadline) < new Date(filters.startingNewTaskDeadline)) return false;
                if (filters.endingNewTaskDeadline && new Date(task.newTaskDeadline) > new Date(filters.endingNewTaskDeadline)) return false;
                return true;
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
    updateTaskReducer,
    unarchiveTaskReducer,
    deleteTaskReducer,
} = taskSlice.actions
export default taskSlice.reducer