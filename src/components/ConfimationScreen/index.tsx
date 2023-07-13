import { useContext } from 'react'
import styles from './styles.module.sass'

import { Button, ConfigProvider, Result } from 'antd'
import { OperationsStoreContext } from '../../store'

interface SuccessMessageProps {
  operationType: 'Cadastro' | 'Edição' | 'Exclusão'
  status: 'success' | 'error'
}

export function SuccessMessage({ operationType, status }: SuccessMessageProps) {
  const operation = useContext(OperationsStoreContext)

  function handleBack() {
    operation.updateOperationsWindowValue('fetchData', !operation.fetchData)
    operation.updateOperationsWindowValue('isSuccessScreenOpen', false)
    operation.updateOperationsWindowValue('isModalOpen', false)
    operation.resetOperationsWindow()
    operation.updateOperationsWindowValue('fetchData', !operation.fetchData)
  }

  return (
    <>
      <div className={styles.container}>
        <Result
          status={status === 'error' ? 'warning' : 'success'}
          title={`${status === 'success'
              ? `Operação de ${operationType} realizada com sucesso!`
              : `Ocorreu um erro ao realizar a operação de ${operationType}, entre em contato com a equipe de suporte.  `
            }`}
          extra={[
            <ConfigProvider
              key={1}
              theme={{
                token: {
                  colorPrimary: '#0A489B',
                },
              }}
            >
              <Button onClick={handleBack}>Voltar</Button>,
            </ConfigProvider>,
          ]}
        />
      </div>
    </>
  )
}
