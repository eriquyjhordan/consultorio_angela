import { useContext, createContext, useState } from 'react'

export interface OperationsStore {
  account: string
  banco: string
  tipo: string
  operacao: string
  natureza: string
  moeda: string
  spot: string
  taxa_final: string
  volume: string
  despesas: string
  dataDeFechamento: Date | undefined
  dataDeLiquidacao: Date | undefined
  nomeCliente: string
  tipoDePessoa: string
  documentoDoCliente: string
  banker: string
  originador: string
  franquia: string
  filial: string
  polo: string
  estado: string
  spread: string
  volumeFinanceiro: string
  receita: string
  isNotBtgClient: boolean
  fetchData: boolean
  isModalOpen: boolean
  isSuccessScreenOpen: boolean
  updateOperationsWindowValue: (
    property: keyof OperationsStore,
    value: any
  ) => void
  resetOperationsWindow: () => void
}

export const OperationsStoreContext = createContext<OperationsStore>(
  {} as OperationsStore
)

export function useOperationsStore() {
  return useContext(OperationsStoreContext)
}

export function OperationsStoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [state, setState] = useState<OperationsStore>({
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
    updateOperationsWindowValue: (property, value) => {
      setState((prevState) => ({
        ...prevState,
        [property]: value,
      }))
    },
    resetOperationsWindow: () => {
      setState((prevState) => ({
        ...prevState,
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
        isNotBtgClient: false,
        fetchData: false,
        isModalOpen: false,
        isSuccessScreenOpen: false,
      }))
    },
  })

  return (
    <OperationsStoreContext.Provider value={state}>
      {children}
    </OperationsStoreContext.Provider>
  )
}
