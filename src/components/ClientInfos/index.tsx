import { Input, Select, DatePicker, Switch } from 'antd'
import styles from './styles.module.sass'
import { selectOptions } from '../../resources/data/selectOptions'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { updateOperationsWindowValue } from '../../app/GlobalRedux/Features/operation/operationSlice';
import type { RootState } from '../../app/GlobalRedux/store';

export function ClientInfos() {
  const operation = useSelector((state: RootState) => state.operation);
  const dispatch = useDispatch();
  const filter = (input: any, option: any) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

  const sort = (optionA: any, optionB: any) =>
    (optionA?.label ?? '')
      .toLowerCase()
      .localeCompare((optionB?.label ?? '').toLowerCase())

  useEffect(() => {
    try {
      if (operation.tipo === 'Compra' && operation.spot !== '' && operation.taxa_final !== '') {
        dispatch(updateOperationsWindowValue({
          property: 'spread',
          value: `${(Number(operation.taxa_final) / Number(operation.spot) - 1) * 100}`
        }))
      } else if (operation.tipo === 'Venda' && operation.spot !== '' && operation.taxa_final !== '') {
        dispatch(updateOperationsWindowValue({
          property: 'spread',
          value: `${(Number(operation.spot) / Number(operation.taxa_final) - 1) * 100}`
        }))
      }
    } catch (error) {
      dispatch(updateOperationsWindowValue({
        property: 'spread',
        value: 0
      }))
    }
  }, [operation.taxa_final, operation.spot, operation.tipo])

  useEffect(() => {
    try {
      if (operation.tipo === 'Compra') {
        dispatch(updateOperationsWindowValue({
          property: 'receita',
          value: `${(((Number(operation.taxa_final) - Number(operation.spot)) *
            (Number(operation.volume) -
            Number(operation.despesas)))/ 2)
            }`
        }))
      } else {
        dispatch(updateOperationsWindowValue({
          property: 'receita',
          value: `${(((Number(operation.spot) - Number(operation.taxa_final)) *
            (Number(operation.volume) -
            Number(operation.despesas)))/2)
            }`
        }))
      }
    } catch (error) {
      console.log('error ao registrar receita', error)
      dispatch(updateOperationsWindowValue({
        property: 'receita',
        value: 0
      }))
    }
  }, [operation.taxa_final, operation.spot, operation.tipo, operation.volume, operation.despesas])

  useEffect(() => {
    if (operation.volume !== '' && operation.taxa_final !== '') {
      dispatch(updateOperationsWindowValue({
        property: 'volumeFinanceiro',
        value: `${Number(operation.volume) * Number(operation.taxa_final)}`
      }))
    }
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
              dispatch(updateOperationsWindowValue({
                property: 'nomeCliente',
                value: e.target.value
              }))
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
              dispatch(updateOperationsWindowValue({
                property: 'tipoDePessoa',
                value
              }))
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
            dispatch(updateOperationsWindowValue({
              property: 'documentoDoCliente',
              value: e.target.value
            }))
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
              dispatch(updateOperationsWindowValue({
                property: 'banker',
                value
              }))
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
              dispatch(updateOperationsWindowValue({
                property: 'originador',
                value
              }))
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
              dispatch(updateOperationsWindowValue({
                property: 'franquia',
                value
              }))
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
              dispatch(updateOperationsWindowValue({
                property: 'filial',
                value
              }))
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
              dispatch(updateOperationsWindowValue({
                property: 'polo',
                value
              }))
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
              dispatch(updateOperationsWindowValue({
                property: 'estado',
                value
              }))
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
          value={`${Number(operation.spread).toFixed(4)} %`}
          onChange={(e) =>
            dispatch(updateOperationsWindowValue({
              property: 'spread',
              value: e.target.value
            }))
          }
        />
      </label>
      <label className={styles.labelBox}>
        <span className={styles.label}>Volume Financeiro</span>
        <Input
          className={styles.input}
          type="text"
          disabled
          value={`R$ ${operation.volumeFinanceiro}`}
          onChange={(e) =>
            dispatch(updateOperationsWindowValue({
              property: 'volumeFinanceiro',
              value: e.target.value
            }))
          }
        />
      </label>
      <label className={styles.labelBox}>
        <span className={styles.label}>Receita</span>
        <Input
          className={styles.input}
          type="text"
          disabled
          value={`R$ ${Number(operation.receita).toFixed(2)}`}
          onChange={(e) =>
            dispatch(updateOperationsWindowValue({
              property: 'receita',
              value: e.target.value
            }))
          }
        />
      </label>
    </div>
  )
}
