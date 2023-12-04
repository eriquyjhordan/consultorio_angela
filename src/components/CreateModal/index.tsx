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
import { updateOperationsWindowValue, resetOperationsWindow, updateValuesToEdit } from '../../app/GlobalRedux/Features/operation/operationSlice';
import type { RootState } from '../../app/GlobalRedux/store';


interface ModalProps {
  isModalOpen: boolean
}

export function Modal({ isModalOpen }: ModalProps) {
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

  const handleCancel = () => {
    dispatch(updateOperationsWindowValue({ property: 'isModalOpen', value: false }))
    dispatch(resetOperationsWindow())
  }

  async function firstTable() {
    const {
      clientName,
      cep,
      street,
      neighborhood,
      city,
      state,
      birthDate,
      primaryPhone,
      secondaryPhone,
      email,
      number,
      occupation,
      indicatedBy,
    } = operation
    const { data, error }: any = await supabase.from('Clients').insert([
      {
        name: clientName,
        birthdate: birthDate,
        occupation: occupation,
        address: street,
        neighborhood,
        city,
        zipcode: cep,
        state,
        primary_phone: primaryPhone,
        secondary_phone: secondaryPhone,
        email,
        indicated_by: indicatedBy,
        number
      },
    ])
    return data
  }

  async function handleSave() {
    const {
      clientName,
      cep,
      street,
      neighborhood,
      city,
      state,
      birthDate,
      primaryPhone,
      secondaryPhone,
      email,
      number,
      occupation,
      indicatedBy,
      cpf,
      vacinas,
      alergias,
      cirurgias,
      hepatite,
      diabetes,
      hipertencao,
      doencasVasculares,
      diseaseObservation,
      pePlano,
      peCavo,
      peEsquino,
      peValgo,
      peVaro,
      halluxValgus,
      clientObservation,
    } = operation
    if (operation.clientId) {
      const { data, error }: any = await supabase.from('Clients').update({
        name: clientName,
        birthdate: birthDate,
        occupation: occupation,
        address: street,
        neighborhood,
        city,
        zipcode: cep,
        state,
        primary_phone: primaryPhone,
        secondary_phone: secondaryPhone,
        email,
        indicated_by: indicatedBy,
        number,
        vacina_tetano: vacinas,
        alergias,
        cirurgias,
        hepatite,
        diabetes,
        hipertencao,
        doencasVasculares,
        diseaseObservation,
        pePlano,
        peCavo,
        peEsquino,
        peValgo,
        peVaro,
        halluxValgus,
        clientObservation,
        cpf
      }).eq('id', operation.clientId)
      if (error) {
        console.log('error: ', error)
        setStatus('error')
        dispatch(updateOperationsWindowValue({ property: 'fetchData', value: !operation.fetchData }))
        dispatch(updateOperationsWindowValue({ property: 'isSuccessScreenOpen', value: true }))
        return
      }
    } else {
    const { data, error }: any = await supabase.from('Clients').insert([
      {
        name: clientName,
        birthdate: birthDate,
        occupation: occupation,
        address: street,
        neighborhood,
        city,
        zipcode: cep,
        state,
        primary_phone: primaryPhone,
        secondary_phone: secondaryPhone,
        email,
        indicated_by: indicatedBy,
        cpf,
        number,
        vacina_tetano: vacinas,
        alergias,
        cirurgias,
        hepatite,
        diabetes,
        hipertencao,
        doencasVasculares,
        diseaseObservation,
        pePlano,
        peCavo,
        peEsquino,
        peValgo,
        peVaro,
        halluxValgus,
        clientObservation,
      },
    ])
    if (error) {
      console.log('error: ', error)
      setStatus('error')
      dispatch(updateOperationsWindowValue({ property: 'fetchData', value: !operation.fetchData }))
      dispatch(updateOperationsWindowValue({ property: 'isSuccessScreenOpen', value: true }))
      return
    }
   }
    setStatus('success')
    dispatch(updateOperationsWindowValue({ property: 'isSuccessScreenOpen', value: true }))
    dispatch(updateOperationsWindowValue({ property: 'fetchData', value: !operation.fetchData }))
  }
  async function handleDelete() {
    if (operation.clientId) {
      const { data, error }: any = await supabase.from('Clients').delete().eq('id', operation.clientId)
      if (data) {
        setStatus('success')
        dispatch(updateOperationsWindowValue({ property: 'isSuccessScreenOpen', value: true }))
        dispatch(updateOperationsWindowValue({ property: 'fetchData', value: !operation.fetchData }))
      } else if (error) {
        setStatus('error')
        dispatch(updateOperationsWindowValue({ property: 'isSuccessScreenOpen', value: true }))
        dispatch(updateOperationsWindowValue({ property: 'fetchData', value: !operation.fetchData }))
      }
    }
  }

  useEffect(() => {
    async function fetchData() {
      const { data: clients, error } = await supabase
        .from('Clients')
        .select('*')
        .eq('id', operation.clientId)
      if (clients) {
        dispatch(updateValuesToEdit(clients[0]))
      }
    }

    fetchData()

  }, [operation.isModalOpen, operation.clientId])


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
                <h1 className={styles.title}>Cadastro de Clientes</h1>
              </div>
              <div className={styles.infos}>
                <OperationInformation />
                <div className={styles.divider}></div>
                <ClientInfos />
              </div>
              <footer className={styles.footer}>
                <div className={styles.buttons} >
                  <Button onClick={handleCancel}>Cancelar</Button>
                  {operation.clientId && (
                    <ConfigProvider
                      theme={{
                        token: {
                          colorPrimary: '#FF4D4F',
                        },
                      }}
                    >
                      <Button type="primary" onClick={() => handleDelete()}>Excluir</Button>
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
                    {operation.clientId ? 'Salvar' : 'Cadastrar'}
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
