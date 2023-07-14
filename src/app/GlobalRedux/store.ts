'use client';

import { configureStore } from '@reduxjs/toolkit';
import operationReducer from './Features/operation/operationSlice';

export const store = configureStore({
    reducer: {
        operation: operationReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;