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
import { useContext, useEffect, useState } from 'react'
import { OperationsStoreContext } from '../../store'
import { v4 as uuid } from 'uuid'
import { SuccessMessage } from '../ConfimationScreen'
import dayjs from 'dayjs'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

interface ModalProps {
  isModalOpen: boolean
  exchangeControlId?: string
}

export function Modal({ isModalOpen, exchangeControlId }: ModalProps) {
  const supabase = createClientComponentClient()
  const [userEmail, setuserEmail] = useState('')
  const operation = useContext(OperationsStoreContext)
  const [operationType, setOperationType] = useState<
    'Cadastro' | 'Edição' | 'Exclusão'
  >('Cadastro')
  const [status, setStatus] = useState<'success' | 'error'>('success')

  const handleOk = () => {
    operation.updateOperationsWindowValue('isModalOpen', false)
  }

  useEffect(() => {
    async function fetchExchangeControl() {
      try {
        const { data } = await supabase.from('exchange_control').select('*').eq('exchange_control_id', exchangeControlId)
        if (data) {
          operation.updateOperationsWindowValue('account', data[0].account_number)
          operation.updateOperationsWindowValue('banker', data[0].banker_id)
          operation.updateOperationsWindowValue(
            'documentoDoCliente',
            data[0].investor_document
          )
          operation.updateOperationsWindowValue(
            'nomeCliente',
            data[0].investor_full_name
          )
          operation.updateOperationsWindowValue(
            'tipoDePessoa',
            data[0].investor_type
          )
          operation.updateOperationsWindowValue('filial', data[0].office_id)
          operation.updateOperationsWindowValue('banco', data[0].operation_bank)
          operation.updateOperationsWindowValue(
            'operacao',
            data[0].operation_category
          )
          operation.updateOperationsWindowValue('moeda', data[0].operation_currency)
          operation.updateOperationsWindowValue(
            'dataDeFechamento',
            data[0].operation_date
          )
          operation.updateOperationsWindowValue(
            'despesas',
            data[0].operation_expenses
          )
          operation.updateOperationsWindowValue(
            'taxa_final',
            data[0].operation_final_rate
          )
          operation.updateOperationsWindowValue(
            'volumeFinanceiro',
            data[0].operation_financial_volume
          )
          operation.updateOperationsWindowValue(
            'dataDeLiquidacao',
            data[0].operation_liquidity_date
          )
          operation.updateOperationsWindowValue(
            'natureza',
            data[0].operation_nature
          )
          operation.updateOperationsWindowValue(
            'receita',
            data[0].operation_revenue
          )
          operation.updateOperationsWindowValue('spot', data[0].operation_spot)
          operation.updateOperationsWindowValue('spread', data[0].operation_spread)
          operation.updateOperationsWindowValue('tipo', data[0].operation_type)
          operation.updateOperationsWindowValue('volume', data[0].operation_volume)
          operation.updateOperationsWindowValue('franquia', data[0].segment_id)
          operation.updateOperationsWindowValue('originador', data[0].originator_id)
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
    operation.resetOperationsWindow()
    operation.updateOperationsWindowValue('fetchData', !operation.fetchData)
    operation.updateOperationsWindowValue('isModalOpen', false)
    operation.updateOperationsWindowValue('isSuccessScreenOpen', false)
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
      operation.updateOperationsWindowValue('isSuccessScreenOpen', true)
    } catch (error) {
      console.log('error', error)
      exchangeControlId
        ? setOperationType('Edição')
        : setOperationType('Cadastro')
      setStatus('error')
      operation.updateOperationsWindowValue('isSuccessScreenOpen', true)
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
      operation.updateOperationsWindowValue('isSuccessScreenOpen', true)
    } catch (error) {
      console.log('error', error)
      setOperationType('Exclusão')
      setStatus('error')
      operation.updateOperationsWindowValue('isSuccessScreenOpen', true)
    }
  }

  return (
    <>
      <AntdModal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1200}
        style={{ top: 15 }}
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
                        operation.updateOperationsWindowValue(
                          'isNotBtgClient',
                          !operation.isNotBtgClient
                        )
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
                  <Button onClick={() => operation.resetOperationsWindow()}>
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
