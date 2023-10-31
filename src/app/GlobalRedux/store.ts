'use client';

import { configureStore } from '@reduxjs/toolkit';
import operationReducer from './Features/operation/operationSlice';
import visitReducer from './Features/RegisterVisit/registerSlice';

export const store = configureStore({
    reducer: {
        operation: operationReducer,
        visit: visitReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;