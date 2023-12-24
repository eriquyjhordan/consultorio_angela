import { useContext } from 'react'
import styles from './styles.module.sass'

import { Button, ConfigProvider, Result } from 'antd'
import { useSelector, useDispatch } from 'react-redux';
import { updateOperationsWindowValue, resetOperationsWindow } from '../../app/GlobalRedux/Features/operation/operationSlice';
import { resetVisitWindow, updateVisitWindowValue } from '../../app/GlobalRedux/Features/RegisterVisit/registerSlice';
import type { RootState } from '../../app/GlobalRedux/store';
interface SuccessMessageProps {
  operationType: 'Cadastro' | 'Edição' | 'Exclusão'
  status: 'success' | 'error'
}

export function SuccessMessage({ operationType, status }: SuccessMessageProps) {
  const operation = useSelector((state: RootState) => state.operation);
  const visit = useSelector((state: RootState) => state.visit);
  const dispatch = useDispatch();
  function handleBack() {
    dispatch(resetOperationsWindow())
    dispatch(resetVisitWindow())
    dispatch(updateOperationsWindowValue({ property: 'fetchData', value: !operation.fetchData }))
    dispatch(updateVisitWindowValue({ property: 'fetchData', value: !visit.fetchData }))
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
