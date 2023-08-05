import { combineReducers, configureStore } from '@reduxjs/toolkit'

import approvalReducer from './reducer/approval'
import meetingReducer from './reducer/meeting'
import notificationReducer from './reducer/notification'
import userReducer from './reducer/user'
import taskReducer from './reducer/task'
import saleReducer from './reducer/sale'
import leadReducer from './reducer/lead'


const rootReducer = combineReducers({
    approval: approvalReducer,
    meeting: meetingReducer,
    notification: notificationReducer,
    user: userReducer,
    task: taskReducer,
    sale: saleReducer,
    lead: leadReducer,
})


export const store = configureStore({
    reducer: rootReducer
})