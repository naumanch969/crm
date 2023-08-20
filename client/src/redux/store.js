import { combineReducers, configureStore } from '@reduxjs/toolkit';
import uploadReducer from './reducer/upload';
import approvalReducer from './reducer/approval';
import meetingReducer from './reducer/meeting';
import notificationReducer from './reducer/notification';
import userReducer from './reducer/user'; // Corrected import name
import taskReducer from './reducer/task';
import saleReducer from './reducer/sale';
import leadReducer from './reducer/lead';
import projectReducer from './reducer/project';
import cashbookReducer from './reducer/cashbook';

const rootReducer = combineReducers({
    upload: uploadReducer,
    approval: approvalReducer,
    meeting: meetingReducer,
    notification: notificationReducer,
    user: userReducer, // Corrected reducer name
    task: taskReducer,
    sale: saleReducer,
    lead: leadReducer,
    project: projectReducer,
    cashbook: cashbookReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});
