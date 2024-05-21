import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import calenderSlice from './slices/calenderSlice';
import examSlice from './slices/examSlice';
import parentSlice from './slices/parentSlice';
import reportsSlice from './slices/reportsSlice';

export const store = configureStore({
    reducer: {
        userData: userSlice,
        examData: examSlice, 
        calenderData : calenderSlice,
        parentData: parentSlice,
        reportsData: reportsSlice,
    },
    devTools: true 
});
