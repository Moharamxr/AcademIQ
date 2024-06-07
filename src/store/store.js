import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import calenderSlice from './slices/calenderSlice';
import examSlice from './slices/examSlice';
import parentSlice from './slices/parentSlice';
import reportsSlice from './slices/reportsSlice';
import assignmentSlice from './slices/assignmentSlice';
import chatSlice from './slices/chatSlice';

export const store = configureStore({
    reducer: {
        userData: userSlice,
        examData: examSlice, 
        calenderData : calenderSlice,
        parentData: parentSlice,
        reportsData: reportsSlice,
        assignmentData: assignmentSlice,
        chatData : chatSlice,
    },
    devTools: true 
});
