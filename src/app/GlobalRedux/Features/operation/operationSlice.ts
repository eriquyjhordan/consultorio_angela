'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OperationsStore {
    account: string;
    banco: string;
    tipo: string;
    operacao: string;
    natureza: string;
    moeda: string;
    spot: string;
    taxa_final: string;
    volume: string;
    despesas: string;
    dataDeFechamento: Date | undefined;
    dataDeLiquidacao: Date | undefined;
    nomeCliente: string;
    tipoDePessoa: string;
    documentoDoCliente: string;
    banker: string;
    originador: string;
    franquia: string;
    filial: string;
    polo: string;
    estado: string;
    spread: string;
    volumeFinanceiro: string;
    receita: string;
    isNotBtgClient: boolean;
    fetchData: boolean;
    isModalOpen: boolean;
    isSuccessScreenOpen: boolean;
    exchangeId?: string;
}

const initialState: OperationsStore = {
    account: '',
    banco: '',
    tipo: '',
    operacao: '',
    natureza: '',
    moeda: '',
    volume: '',
    spot: '',
    taxa_final: '',
    despesas: '',
    dataDeFechamento: undefined,
    dataDeLiquidacao: undefined,
    nomeCliente: '',
    tipoDePessoa: '',
    documentoDoCliente: '',
    banker: '',
    originador: '',
    franquia: '',
    filial: '',
    polo: '',
    estado: '',
    spread: '',
    volumeFinanceiro: '',
    receita: '',
    fetchData: false,
    isNotBtgClient: false,
    isModalOpen: false,
    isSuccessScreenOpen: false,
    exchangeId: undefined,
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
        updataValuesToEdit: (state: OperationsStore, action: PayloadAction<any>) => {
            const exchangeControlData = action.payload;
            state.account = exchangeControlData.account_number;
            state.banker = exchangeControlData.banker_id;
            state.documentoDoCliente = exchangeControlData.investor_document;
            state.nomeCliente = exchangeControlData.investor_full_name;
            state.tipoDePessoa = exchangeControlData.investor_type;
            state.filial = exchangeControlData.office_id;
            state.banco = exchangeControlData.operation_bank;
            state.operacao = exchangeControlData.operation_category;
            state.moeda = exchangeControlData.operation_currency;
            state.dataDeFechamento = exchangeControlData.operation_date;
            state.despesas = exchangeControlData.operation_expenses;
            state.taxa_final = exchangeControlData.operation_final_rate;
            state.volumeFinanceiro = exchangeControlData.operation_financial_volume;
            state.dataDeLiquidacao = exchangeControlData.operation_liquidity_date;
            state.natureza = exchangeControlData.operation_nature;
            state.receita = exchangeControlData.operation_revenue;
            state.spot = exchangeControlData.operation_spot;
            state.spread = exchangeControlData.operation_spread;
            state.tipo = exchangeControlData.operation_type;
            state.volume = exchangeControlData.operation_volume;
            state.franquia = exchangeControlData.segment_id;
            state.originador = exchangeControlData.originator_id;
          },
        updateAccountDataValues: (state: OperationsStore, action: PayloadAction<any>) => {
            const accountData = action.payload;
            state.nomeCliente = accountData.investor_full_name;
            state.tipoDePessoa = accountData.investor_document.length > 11 ? 'PJ' : 'PF';
            state.documentoDoCliente = accountData.investor_document;
            state.banker = accountData.banker_id;
            state.originador = accountData.originator_id;
            state.franquia = accountData.segment_id;
            state.filial = accountData.office_id;
            state.polo = accountData.office_id;
            state.estado = accountData.state_id;
        },
        resetOperationsWindow: (state) => {
            return initialState;
        },
    },
});

export const { resetOperationsWindow, updateOperationsWindowValue, updataValuesToEdit, updateAccountDataValues } = operationsSlice.actions;

export default operationsSlice.reducer;