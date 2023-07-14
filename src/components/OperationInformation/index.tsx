import { useContext, useEffect } from 'react'
import styles from './styles.module.sass'
import dayjs from 'dayjs'
import { Input, Select, DatePicker } from 'antd'
import { selectOptions } from '../../resources/data/selectOptions'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useSelector, useDispatch } from 'react-redux';
import { updateOperationsWindowValue, updateAccountDataValues } from '../../app/GlobalRedux/Features/operation/operationSlice';
import type { RootState } from '../../app/GlobalRedux/store';

dayjs.extend(customParseFormat)
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY']

export function OperationInformation() {
  const operation = useSelector((state: RootState) => state.operation);
  const dispatch = useDispatch();
  const supabase = createClientComponentClient()
  const filter = (input: any, option: any) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

  const sort = (optionA: any, optionB: any) =>
    (optionA?.label ?? '')
      .toLowerCase()
      .localeCompare((optionB?.label ?? '').toLowerCase())

  useEffect(() => {
    async function searchByAccountNumber(account_number: string) {
      try {
        const { data } = await supabase.from('client_area').select('*').eq('account_number', account_number)
        if (data) {
          if (data.length > 0) {
            dispatch(updateAccountDataValues(data[0]))
          }
        } else {
          throw new Error('Nenhum dado encontrado')
        }
      } catch (error) {
        console.log('error', error)
      }
    }
    searchByAccountNumber(operation.account)
  }, [operation.account])

  console.log('taxa final: ', operation.taxa_final)
  return (
    <div className={styles.inputs}>
      <h2 className={styles.subTitle}>Informações da conta</h2>
      <label>
        <span className={styles.label}>Número da conta</span>
        <Input
          placeholder="ex.: 1361866"
          className={styles.input}
          type="text"
          maxLength={9}
          value={operation.account}
          onChange={(e) =>
            dispatch(updateOperationsWindowValue({
              property: 'account',
              value: e.target.value
            }))
          }
        />
      </label>
      <h2 className={styles.subTitle}>Informações da operação</h2>
      <label>
        <span className={styles.label}>Banco</span>
        <Select
          placeholder="ex.: BTG"
          className={styles.input}
          showSearch
          style={{ width: '100%' }}
          options={selectOptions.bancos}
          optionFilterProp="children"
          filterOption={filter}
          filterSort={sort}
          value={operation.banco}
          onChange={(value) =>
            dispatch(updateOperationsWindowValue({
              property: 'banco',
              value: value
            }))
          }
        />
      </label>
      <div className={styles.rowEqual}>
        <label className={styles.labelBox}>
          <span className={styles.label}>Tipo</span>
          <Select
            placeholder="ex.: Compra"
            className={styles.input}
            showSearch
            style={{ width: '100%' }}
            options={selectOptions.tiposOperacao}
            optionFilterProp="children"
            filterOption={filter}
            filterSort={sort}
            value={operation.tipo}
            onChange={(value) =>
              dispatch(updateOperationsWindowValue({
                property: 'tipo',
                value,
              }))
            }
          />
        </label>
        <label className={styles.labelBox}>
          <span className={styles.label}>Operação</span>
          <Select
            placeholder="ex.: Futuro"
            className={styles.input}
            showSearch
            style={{ width: '100%' }}
            options={selectOptions.operacao}
            optionFilterProp="children"
            filterOption={filter}
            filterSort={sort}
            value={operation.operacao}
            onChange={(value) =>
              dispatch(updateOperationsWindowValue({
                property: 'operacao',
                value,
              }))
            }
          />
        </label>
        <label className={styles.labelBox}>
          <span className={styles.label}>Natureza</span>
          <Select
            placeholder="ex.: Importação"
            className={styles.input}
            showSearch
            style={{ width: '100%' }}
            options={selectOptions.natureza}
            optionFilterProp="children"
            filterOption={filter}
            filterSort={sort}
            value={operation.natureza}
            onChange={(value) =>
              dispatch(updateOperationsWindowValue({
                property: 'natureza',
                value,
              }))
            }
          />
        </label>
      </div>
      <div className={styles.rowEqual}>
        <label className={styles.labelBox}>
          <span className={styles.label}>Moeda</span>
          <Select
            placeholder="ex.: JPY"
            className={styles.input}
            showSearch
            style={{ width: '100%' }}
            options={selectOptions.moedas}
            optionFilterProp="children"
            filterOption={filter}
            filterSort={sort}
            value={operation.moeda}
            onChange={(value) =>
              dispatch(updateOperationsWindowValue({
                property: 'moeda',
                value,
              }))
            }
          />
        </label>
        <label className={styles.labelBox}>
          <span className={styles.label}>Volume</span>
          <Input
            placeholder="ex.: $ 237.000,00"
            className={styles.input}
            type="text"
            value={operation.volume}
            onChange={(e) =>
              dispatch(updateOperationsWindowValue({
                property: 'volume',
                value: e.target.value
              }))
            }
          />
        </label>
      </div>
      <div className={styles.rowEqual}>
        <label className={styles.labelBox}>
          <span className={styles.label}>Spot</span>
          <Input
            placeholder="ex.: $ 5,9414"
            className={styles.input}
            type="text"
            value={operation.spot}
            onChange={(e) =>
              dispatch(updateOperationsWindowValue({
                property: 'spot',
                value: e.target.value
              }))
            }
          />
        </label>
        <label className={styles.labelBox}>
          <span className={styles.label}>Taxa Final</span>
          <Input
            placeholder="ex.: $ 5,941"
            className={styles.input}
            type="text"
            value={operation.taxa_final}
            onChange={(e) =>
              dispatch(updateOperationsWindowValue({
                property: 'taxa_final',
                value: e.target.value
              }))
            }
          />
        </label>
      </div>
      <label className={styles.labelBox}>
        <span className={styles.label}>Despesas</span>
        <Input
          placeholder="ex.: R$ 90,00"
          className={styles.input}
          type="text"
          value={operation.despesas}
          onChange={(e) =>
            dispatch(updateOperationsWindowValue({
              property: 'despesas',
              value: e.target.value
            }))
          }
        />
      </label>
      <div className={styles.rowEqual}>
        <label className={styles.labelBox}>
          <span className={styles.label}>Data de Fechamento</span>
          <DatePicker
            placeholder="Selecione a data"
            format={dateFormatList}
            value={
              operation.dataDeFechamento
                ? dayjs(operation.dataDeFechamento)
                : undefined
            }
            onChange={(value) =>
              dispatch(updateOperationsWindowValue({
                property: 'dataDeFechamento',
                value: dayjs(value)
              }))
            }
          />
        </label>
        <label className={styles.labelBox}>
          <span className={styles.label}>Data de Liquidação</span>
          <DatePicker
            placeholder="Selecione a data"
            format={dateFormatList}
            value={
              operation.dataDeLiquidacao
                ? dayjs(operation.dataDeLiquidacao)
                : undefined
            }
            onChange={(value) =>
              dispatch(updateOperationsWindowValue({
                property: 'dataDeLiquidacao',
                value: dayjs(value)
              }))
            }
          />
        </label>
      </div>
    </div>
  )
}
