import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import calenderSlice from './slices/calenderSlice';
import ExamSlice from './slices/ExamSlice';
import parentSlice from './slices/parentSlice';
import reportsSlice from './slices/reportsSlice';

export const store = configureStore({
    reducer: {
        userData: userSlice,
        examData: ExamSlice, 
        calenderData : calenderSlice,
        parentData: parentSlice,
        reportsData: reportsSlice,
    },
    devTools: true 
});
