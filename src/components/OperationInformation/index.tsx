import { useContext, useEffect } from 'react'
import styles from './styles.module.sass'
import dayjs from 'dayjs'
import { Input, Select, DatePicker } from 'antd'
import { selectOptions } from '../../resources/data/selectOptions'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { OperationsStoreContext } from '../../store'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

dayjs.extend(customParseFormat)
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY']

export function OperationInformation() {
  const supabase = createClientComponentClient()
  const apikey = ''
  const token = ''

  const operation = useContext(OperationsStoreContext)
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
            operation.updateOperationsWindowValue(
              'nomeCliente',
              data[0].investor_full_name
            )
            operation.updateOperationsWindowValue(
              'tipoDePessoa',
              data[0].investor_document.length > 11 ? 'PJ' : 'PF'
            )
            operation.updateOperationsWindowValue(
              'documentoDoCliente',
              data[0].investor_document
            )
            operation.updateOperationsWindowValue('banker', data[0].banker_id)
            operation.updateOperationsWindowValue(
              'originador',
              data[0].originator_id
            )
            operation.updateOperationsWindowValue('franquia', data[0].segment_id)
            operation.updateOperationsWindowValue('filial', data[0].office_id)
            operation.updateOperationsWindowValue('polo', data[0].office_id)
            operation.updateOperationsWindowValue('estado', data[0].state_id)
    
            console.log(data)
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
            operation.updateOperationsWindowValue('account', e.target.value)
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
            operation.updateOperationsWindowValue('banco', value)
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
              operation.updateOperationsWindowValue('tipo', value)
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
              operation.updateOperationsWindowValue('operacao', value)
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
              operation.updateOperationsWindowValue('natureza', value)
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
              operation.updateOperationsWindowValue('moeda', value)
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
              operation.updateOperationsWindowValue('volume', e.target.value)
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
              operation.updateOperationsWindowValue('spot', e.target.value)
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
              operation.updateOperationsWindowValue(
                'taxa_final',
                e.target.value
              )
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
            operation.updateOperationsWindowValue('despesas', e.target.value)
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
              operation.updateOperationsWindowValue(
                'dataDeFechamento',
                dayjs(value)
              )
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
              operation.updateOperationsWindowValue(
                'dataDeLiquidacao',
                dayjs(value)
              )
            }
          />
        </label>
      </div>
    </div>
  )
}
