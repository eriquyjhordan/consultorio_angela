import { Input, Select, DatePicker, Switch } from 'antd'
import styles from './styles.module.sass'
import { selectOptions } from '../../resources/data/selectOptions'
import { useContext, useEffect } from 'react'
import { OperationsStoreContext } from '../../store'

export function ClientInfos() {
  const operation = useContext(OperationsStoreContext)
  const filter = (input: any, option: any) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

  const sort = (optionA: any, optionB: any) =>
    (optionA?.label ?? '')
      .toLowerCase()
      .localeCompare((optionB?.label ?? '').toLowerCase())

  useEffect(() => {
    try {
      if (operation.tipo === 'Compra') {
        operation.updateOperationsWindowValue(
          'spread',
          `${(Number(operation.taxa_final) / Number(operation.spot) - 1) * 100}`
        )
      } else {
        operation.updateOperationsWindowValue(
          'spread',
          `${(Number(operation.spot) / Number(operation.taxa_final) - 1) * 100}`
        )
      }
    } catch (error) {
      operation.updateOperationsWindowValue('spread', 0)
    }
  }, [operation.taxa_final, operation.spot, operation.tipo])

  useEffect(() => {
    try {
      if (operation.tipo === 'Compra') {
        operation.updateOperationsWindowValue(
          'receita',
          `${
            (Number(operation.taxa_final) - Number(operation.spot)) *
              Number(operation.volume) -
            Number(operation.despesas)
          }`
        )
      } else {
        operation.updateOperationsWindowValue(
          'receita',
          `${
            (Number(operation.spot) - Number(operation.taxa_final)) *
              Number(operation.volume) -
            Number(operation.despesas)
          }`
        )
      }
    } catch (error) {
      operation.updateOperationsWindowValue('receita', 0)
    }
  }, [operation.taxa_final, operation.spot, operation.tipo, operation.volume])

  useEffect(() => {
    operation.updateOperationsWindowValue(
      'volumeFinanceiro',
      `${Number(operation.volume) * Number(operation.taxa_final)}`
    )
  }, [operation.volume, operation.taxa_final])

  return (
    <div className={styles.outputs}>
      <h2 className={styles.subTitle}>Cliente</h2>
      <div className={styles.rowEqual}>
        <label className={styles.labelBox}>
          <span className={styles.label}>Nome</span>
          <Input
            className={styles.input}
            type="text"
            value={operation.nomeCliente}
            disabled={!operation.isNotBtgClient}
            onChange={(e) =>
              operation.updateOperationsWindowValue(
                'nomeCliente',
                e.target.value
              )
            }
          />
        </label>
        <label className={styles.labelBox} style={{ maxWidth: '4rem' }}>
          <span className={styles.label}>Tipo</span>
          <Select
            className={styles.input}
            showSearch
            style={{ width: '100%' }}
            options={selectOptions.tipoPessoa}
            optionFilterProp="children"
            filterOption={filter}
            disabled={!operation.isNotBtgClient}
            filterSort={sort}
            value={operation.tipoDePessoa}
            onChange={(value) =>
              operation.updateOperationsWindowValue('tipoDePessoa', value)
            }
          />
        </label>
      </div>
      <label className={styles.labelBox}>
        <span className={styles.label}>Documento</span>
        <Input
          className={styles.input}
          type="text"
          disabled={!operation.isNotBtgClient}
          value={operation.documentoDoCliente}
          onChange={(e) =>
            operation.updateOperationsWindowValue(
              'documentoDoCliente',
              e.target.value
            )
          }
        />
      </label>
      <div className={styles.rowEqual}>
        <label className={styles.labelBox}>
          <span className={styles.label}>Banker</span>
          <Select
            className={styles.input}
            showSearch
            disabled={!operation.isNotBtgClient}
            style={{ width: '100%' }}
            options={selectOptions.bankers}
            optionFilterProp="children"
            filterOption={filter}
            filterSort={sort}
            value={operation.banker}
            onChange={(value) =>
              operation.updateOperationsWindowValue('banker', value)
            }
          />
        </label>
        <label className={styles.labelBox}>
          <span className={styles.label}>Originador</span>
          <Select
            className={styles.input}
            showSearch
            style={{ width: '100%' }}
            disabled={!operation.isNotBtgClient}
            options={selectOptions.bankers}
            optionFilterProp="children"
            filterOption={filter}
            filterSort={sort}
            value={operation.originador}
            onChange={(value) =>
              operation.updateOperationsWindowValue('originador', value)
            }
          />
        </label>
        <label className={styles.labelBox} style={{ maxWidth: '4rem' }}>
          <span className={styles.label}>Franquia</span>
          <Select
            className={styles.input}
            showSearch
            disabled={!operation.isNotBtgClient}
            style={{ width: '100%' }}
            options={selectOptions.franquia}
            optionFilterProp="children"
            filterOption={filter}
            filterSort={sort}
            value={operation.franquia}
            onChange={(value) =>
              operation.updateOperationsWindowValue('franquia', value)
            }
          />
        </label>
      </div>
      <div className={styles.rowEqual}>
        <label className={styles.labelBox}>
          <span className={styles.label}>Filial</span>
          <Select
            className={styles.input}
            showSearch
            disabled={!operation.isNotBtgClient}
            style={{ width: '100%' }}
            options={selectOptions.filiais}
            optionFilterProp="children"
            filterOption={filter}
            filterSort={sort}
            value={operation.filial}
            onChange={(value) =>
              operation.updateOperationsWindowValue('filial', value)
            }
          />
        </label>
        <label className={styles.labelBox}>
          <span className={styles.label}>Polo</span>
          <Select
            className={styles.input}
            showSearch
            style={{ width: '100%' }}
            disabled={!operation.isNotBtgClient}
            options={selectOptions.polos}
            optionFilterProp="children"
            filterOption={filter}
            filterSort={sort}
            value={operation.polo}
            onChange={(value) =>
              operation.updateOperationsWindowValue('polo', value)
            }
          />
        </label>
        <label className={styles.labelBox} style={{ maxWidth: '4rem' }}>
          <span className={styles.label}>Estado</span>
          <Select
            className={styles.input}
            showSearch
            disabled={!operation.isNotBtgClient}
            style={{ width: '100%' }}
            options={selectOptions.estados}
            optionFilterProp="children"
            filterOption={filter}
            filterSort={sort}
            value={operation.estado}
            onChange={(value) =>
              operation.updateOperationsWindowValue('estado', value)
            }
          />
        </label>
      </div>
      <h2 className={styles.subTitle}>Operação</h2>
      <label className={styles.labelBox}>
        <span className={styles.label}>Spread</span>
        <Input
          disabled
          className={styles.input}
          type="text"
          value={`${(
            (Number(operation.taxa_final) / Number(operation.spot) - 1) *
            100
          ).toFixed(4)} %`}
          onChange={(e) =>
            operation.updateOperationsWindowValue('spread', e.target.value)
          }
        />
      </label>
      <label className={styles.labelBox}>
        <span className={styles.label}>Volume Financeiro</span>
        <Input
          className={styles.input}
          type="text"
          disabled
          value={`R$ ${(
            Number(operation.volume) * Number(operation.taxa_final)
          ).toLocaleString()}`}
          onChange={(e) =>
            operation.updateOperationsWindowValue(
              'volumeFinanceiro',
              e.target.value
            )
          }
        />
      </label>
      <label className={styles.labelBox}>
        <span className={styles.label}>Receita</span>
        <Input
          className={styles.input}
          type="text"
          disabled
          value={`R$ ${(
            (Number(operation.taxa_final) - Number(operation.spot)) *
              Number(operation.volume) -
            Number(operation.despesas)
          ).toLocaleString()}`}
          onChange={(e) =>
            operation.updateOperationsWindowValue('receita', e.target.value)
          }
        />
      </label>
    </div>
  )
}
