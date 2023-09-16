import { combineReducers, configureStore } from '@reduxjs/toolkit';
import uploadReducer from './reducer/upload';
import approvalReducer from './reducer/approval';
import meetingReducer from './reducer/meeting';
import notificationReducer from './reducer/notification';
import userReducer from './reducer/user'; // Corrected import name
import taskReducer from './reducer/task';
import saleReducer from './reducer/sale';
import leadReducer from './reducer/lead';
import societyReducer from './reducer/society';
import projectReducer from './reducer/project';
import inventoryReducer from './reducer/inventory';
import cashbookReducer from './reducer/cashbook';
import voucherReducer from './reducer/voucher';

const rootReducer = combineReducers({
    upload: uploadReducer,
    approval: approvalReducer,
    meeting: meetingReducer,
    notification: notificationReducer,
    user: userReducer, // Corrected reducer name
    task: taskReducer,
    sale: saleReducer,
    lead: leadReducer,
    society: societyReducer,
    project: projectReducer,
    inventory: inventoryReducer,
    cashbook: cashbookReducer,
    voucher: voucherReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});
