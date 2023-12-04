'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VisitStore {
    isVisitModalOpen: boolean;
    isSuccessScreenOpen: boolean;
    oniciolise: boolean;
    onicomicose: boolean;
    onicogrifose: boolean;
    outros: string;
    desconforto: boolean;
    desconfortoText: string;
}

const initialState: VisitStore = {
    isVisitModalOpen: false,
    isSuccessScreenOpen: false,
    oniciolise: false,
    onicomicose: false,
    onicogrifose: false,
    outros: '',
    desconforto: false,
    desconfortoText: '',
};
const visitSlice = createSlice({
    name: 'Visit',
    initialState,
    reducers: {
        updateVisitWindowValue: (
            state: any,
            action: PayloadAction<{ property: keyof VisitStore; value: any }>
        ) => {
            const { property, value } = action.payload;
            state[property] = value;
        },
        updateValuesToEdit: (state: VisitStore, action: PayloadAction<any>) => {
            const exchangeControlData = action.payload;
        },
        resetVisitWindow: (state) => {
            return initialState;
        },
    },
});

export const { resetVisitWindow, updateVisitWindowValue, updateValuesToEdit: updateValuesToEdit, } = visitSlice.actions;

export default visitSlice.reducer;