import {
  Button,
  Modal as AntdModal,
  ConfigProvider,
  Switch,
  Popconfirm,
} from 'antd'
import styles from './styles.module.sass'
import { OperationInformation } from '../OperationInformation'
import { ClientInfos } from '../ClientInfos'
import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { SuccessMessage } from '../ConfimationScreen'
import dayjs from 'dayjs'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useSelector, useDispatch } from 'react-redux';
import { updateOperationsWindowValue, resetOperationsWindow, updataValuesToEdit } from '../../app/GlobalRedux/Features/operation/operationSlice';
import type { RootState } from '../../app/GlobalRedux/store';


interface ModalProps {
  isModalOpen: boolean
  exchangeControlId?: string
}

export function Modal({ isModalOpen, exchangeControlId }: ModalProps) {
  const operation = useSelector((state: RootState) => state.operation);
  const dispatch = useDispatch();
  const supabase = createClientComponentClient()
  const [userEmail, setuserEmail] = useState('')
  const [operationType, setOperationType] = useState<
    'Cadastro' | 'Edição' | 'Exclusão'
  >('Cadastro')
  const [status, setStatus] = useState<'success' | 'error'>('success')

  const handleOk = () => {
    dispatch(updateOperationsWindowValue({ property: 'isModalOpen', value: false }))
  }

  useEffect(() => {
    async function fetchExchangeControl() {
      try {
        const { data } = await supabase.from('exchange_control').select('*').eq('exchange_control_id', exchangeControlId)
        if (data) {
          dispatch(updataValuesToEdit(data[0]))
        } else {
          throw new Error('Não foi possível encontrar a operação')
        }
      } catch (error) {
        console.log('error', error)
      }
    }
    async function getUserEmail() {
      try {
        const userdata = await supabase.auth.getUser() as any
        const userEmail = userdata.data.user.email
        setuserEmail(userEmail)
        
      } catch (error) {
        console.log('error', error)
      }
    }
    if (exchangeControlId) {
      fetchExchangeControl()
    }
    getUserEmail()
  }, [exchangeControlId])

  function handleCancel() {
    exchangeControlId = undefined
    dispatch(resetOperationsWindow())
    dispatch(updateOperationsWindowValue({ property: 'fetchData', value: !operation.fetchData }))
    dispatch(updateOperationsWindowValue({ property: 'isModalOpen', value: false }))
    dispatch(updateOperationsWindowValue({ property: 'isSuccessScreenOpen', value: false }))
  }

  async function handleSave() {
    try {
      const response = await supabase.from('exchange_control').upsert({
        account_number: operation.account,
        banker_id: operation.banker,
        exchange_control_id: exchangeControlId
          ? exchangeControlId
          : `exchange_control_${uuid()}`,
        investor_document: operation.documentoDoCliente,
        investor_full_name: operation.nomeCliente,
        investor_type: operation.tipoDePessoa,
        office_id: operation.filial,
        operation_bank: operation.banco,
        operation_category: operation.operacao,
        operation_currency: operation.moeda,
        operation_date: dayjs(operation.dataDeFechamento).format(
          'YYYY-MM-DD'
        ),
        operation_expenses: operation.despesas,
        operation_final_rate: operation.taxa_final,
        operation_financial_volume: operation.volumeFinanceiro,
        operation_liquidity_date: dayjs(operation.dataDeLiquidacao).format(
          'YYYY-MM-DD'
        ),
        operation_nature: operation.natureza,
        operation_revenue: operation.receita,
        operation_spot: operation.spot,
        operation_spread: operation.spread,
        operation_type: operation.tipo,
        operation_volume: operation.volume,
        originator_id: operation.originador,
        segment_id: operation.franquia,
        operator: userEmail,
      }).select()
      exchangeControlId
        ? setOperationType('Edição')
        : setOperationType('Cadastro')
      setStatus('success')
      dispatch(updateOperationsWindowValue({ property: 'fetchData', value: !operation.fetchData }))
      dispatch(updateOperationsWindowValue({ property: 'isSuccessScreenOpen', value: true }))
    } catch (error) {
      console.log('error', error)
      exchangeControlId
        ? setOperationType('Edição')
        : setOperationType('Cadastro')
      setStatus('error')
      dispatch(updateOperationsWindowValue({ property: 'fetchData', value: !operation.fetchData }))
      dispatch(updateOperationsWindowValue({ property: 'isSuccessScreenOpen', value: true }))
    }
  }
  
  async function handleDelete() {
    try {
      const { data, error } = await supabase
        .from('exchange_control')
        .update({ is_deleted: true, updated_at: new Date(), operator: userEmail })
        .eq('exchange_control_id', exchangeControlId)
        .select()
      console.log('handle delete: ', data)
      setOperationType('Exclusão')
      setStatus('success')
      dispatch(updateOperationsWindowValue({ property: 'fetchData', value: !operation.fetchData }))
      dispatch(updateOperationsWindowValue({ property: 'isSuccessScreenOpen', value: true }))
    } catch (error) {
      console.log('error', error)
      setOperationType('Exclusão')
      setStatus('error')
      dispatch(updateOperationsWindowValue({ property: 'isSuccessScreenOpen', value: true }))
      dispatch(updateOperationsWindowValue({ property: 'fetchData', value: !operation.fetchData }))
    }
  }

  return (
    <>
      <AntdModal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1200}
        style={{ top: 20 }}
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <div className={styles.container}>
          {operation.isSuccessScreenOpen ? (
            <SuccessMessage operationType={operationType} status={status} />
          ) : (
            <>
              <div className={styles.header}>
                <h1 className={styles.title}>Cadastro de Operações</h1>
              </div>
              <div className={styles.infos}>
                <OperationInformation />
                <div className={styles.divider}></div>
                <ClientInfos />
              </div>
              <footer className={styles.footer}>
                <div className={styles.switchBox}>
                  <span>Não é Cliente BTG?</span>
                  <ConfigProvider
                    theme={{
                      token: {
                        colorPrimary: '#0A489B',
                      },
                    }}
                  >
                    <Switch
                      onChange={(checked) =>
                        console.log(`switch to ${checked}`)
                      }
                      disabled={operation.account ?  operation.account.length > 0 : false}
                      checked={operation.isNotBtgClient}
                      onClick={() =>
                        dispatch(updateOperationsWindowValue({ property: 'isNotBtgClient', value: !operation.isNotBtgClient }))
                      }
                    />
                  </ConfigProvider>
                </div>
                <div className={styles.buttons}>
                  <Button onClick={handleCancel}>Cancelar</Button>
                  {exchangeControlId && (
                    <ConfigProvider
                      theme={{
                        token: {
                          colorPrimary: '#FF4D4F',
                        },
                      }}
                    >
                      <Popconfirm
                        title="Deletar operação"
                        description="Você tem certeza que deseja deletar?"
                        onConfirm={() => handleDelete()}
                        onCancel={() => console.log('cancel')}
                        okText="Sim"
                        cancelText="Não"
                      >
                        <Button type="primary">Excluir</Button>
                      </Popconfirm>
                    </ConfigProvider>
                  )}
                  <Button onClick={() => dispatch(resetOperationsWindow())}>
                    Limpar
                  </Button>
                  <Button
                    onClick={handleSave}
                    type="primary"
                    className={styles.confirmationBtn}
                  >
                    {exchangeControlId ? 'Salvar' : 'Cadastrar'}
                  </Button>
                </div>
                <div></div>
              </footer>
            </>
          )}
        </div>
      </AntdModal>
    </>
  )
}
