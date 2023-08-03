import { combineReducers, configureStore } from '@reduxjs/toolkit'

import userReducer from './reducer/user'
import taskReducer from './reducer/task'
import saleReducer from './reducer/sale'
import leadReducer from './reducer/lead'


const rootReducer = combineReducers({
    user: userReducer,
    task: taskReducer,
    sale: saleReducer,
    lead: leadReducer,
})


export const store = configureStore({
    reducer: rootReducer
})