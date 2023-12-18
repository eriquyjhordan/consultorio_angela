'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OperationsStore {
    clientName: string;
    cep: string;
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    clientsQuantity: string;
    visitorsQuantity: string;
    number: string;
    birthDate: Date;
    primaryPhone: string;
    secondaryPhone: string;
    email: string;
    vacinas: boolean;
    alergias: boolean;
    cirurgias: boolean;
    hepatite: boolean;
    diabetes: boolean;
    hipertencao: boolean;
    doencasVasculares: boolean;
    diseaseObservation: string;
    pePlano: boolean;
    peValgo: boolean;
    peCavo: boolean;
    peEsquino: boolean;
    peVaro: boolean;
    halluxValgus: boolean;
    clientObservation: string;
    fetchData: boolean;
    isModalOpen: boolean;
    isSuccessScreenOpen: boolean;
    clientId: string;
    occupation: string;
    indicatedBy: string;
    cpf: string;
}

const initialState: OperationsStore = {
    clientName: '',
    cpf: '',
    clientsQuantity: '',
    visitorsQuantity: '',
    cep: '',
    street: '',
    neighborhood: '',
    city: '',
    state: '',
    number: '',
    birthDate: undefined,
    primaryPhone: '',
    secondaryPhone: '',
    email: '',
    vacinas: false,
    alergias: false,
    cirurgias: false,
    hepatite: false,
    diabetes: false,
    hipertencao: false,
    doencasVasculares: false,
    diseaseObservation: '',
    pePlano: false,
    peValgo: false,
    peCavo: false,
    peEsquino: false,
    peVaro: false,
    halluxValgus: false,
    clientObservation: '',
    fetchData: false,
    isModalOpen: false,
    isSuccessScreenOpen: false,
    clientId: '',
    occupation: '',
    indicatedBy: '',
};
const operationsSlice = createSlice({
    name: 'operations',
    initialState,
    reducers: {
        updateOperationsWindowValue: (
            state: any,
            action: PayloadAction<{ property: keyof OperationsStore; value: any }>
        ) => {
            const { property, value } = action.payload;
            state[property] = value;
        },
        updateValuesToEdit: (state: OperationsStore, action: PayloadAction<any>) => {
            const exchangeControlData = action.payload;
            state.clientName = exchangeControlData.name;
            state.cep = exchangeControlData.zipcode;
            state.street = exchangeControlData.address;
            state.neighborhood = exchangeControlData.neighborhood;
            state.city = exchangeControlData.city;
            state.state = exchangeControlData.state;
            state.clientsQuantity = exchangeControlData.clientsQuantity;
            state.number = exchangeControlData.number;
            state.birthDate = exchangeControlData.birthDate;
            state.primaryPhone = exchangeControlData.primary_phone;
            state.secondaryPhone = exchangeControlData.secondary_phone;
            state.email = exchangeControlData.email;
            state.vacinas = exchangeControlData.vacina_tetano;
            state.alergias = exchangeControlData.alergias;
            state.cirurgias = exchangeControlData.cirurgias;
            state.hepatite = exchangeControlData.hepatite;
            state.diabetes = exchangeControlData.diabetes;
            state.hipertencao = exchangeControlData.hipertencao;
            state.doencasVasculares = exchangeControlData.doencasVasculares;
            state.diseaseObservation = exchangeControlData.diseaseObservation;
            state.pePlano = exchangeControlData.pePlano;
            state.peValgo = exchangeControlData.peValgo;
            state.peCavo = exchangeControlData.peCavo;
            state.peEsquino = exchangeControlData.peEsquino;
            state.peVaro = exchangeControlData.peVaro;
            state.halluxValgus = exchangeControlData.halluxValgus;
            state.clientObservation = exchangeControlData.clientObservation;
            state.fetchData = exchangeControlData.fetchData;
            state.occupation = exchangeControlData.occupation;
            state.indicatedBy = exchangeControlData.indicated_by;
        },
        resetOperationsWindow: (state) => {
            return initialState;
        },
    },
});

export const { resetOperationsWindow, updateOperationsWindowValue, updateValuesToEdit: updateValuesToEdit, } = operationsSlice.actions;

export default operationsSlice.reducer;