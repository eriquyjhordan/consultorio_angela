import { useEffect } from 'react'
import CepPromise from 'cep-promise'
import styles from './styles.module.sass'
import dayjs from 'dayjs'
import { Input, DatePicker } from 'antd'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useSelector, useDispatch } from 'react-redux';
import { updateOperationsWindowValue } from '../../app/GlobalRedux/Features/operation/operationSlice';
import type { RootState } from '../../app/GlobalRedux/store';

dayjs.extend(customParseFormat)
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY']

export function OperationInformation() {
  const operation = useSelector((state: RootState) => state.operation);
  const dispatch = useDispatch();
  const supabase = createClientComponentClient()

  useEffect(() => {
    async function getAddress(cep: string) {
      try {
        if (cep.length === 8) {
          const address = await CepPromise(cep)
          if (address) {
            dispatch(updateOperationsWindowValue({ property: 'street', value: address.street }))
            dispatch(updateOperationsWindowValue({ property: 'neighborhood', value: address.neighborhood }))
            dispatch(updateOperationsWindowValue({ property: 'city', value: address.city }))
            dispatch(updateOperationsWindowValue({ property: 'state', value: address.state }))
          }
        }
      } catch (error) {
        console.log('zip code consult error: ', error)
      }
    }
    getAddress(operation.cep)
  }, [operation.cep])

  return (
    <div className={styles.inputs}>
      <label>
        <span className={styles.label}>Nome do Cliente</span>
        <Input
          placeholder="ex.: João da Silva"
          className={styles.input}
          type="text"
          value={operation.clientName}
          onChange={(e) =>
            dispatch(updateOperationsWindowValue({
              property: 'clientName',
              value: e.target.value
            }))
          }
        />
      </label>
      <label>
        <span className={styles.label}>Indicado por:</span>
        <Input
          placeholder="ex.: João dos Santos"
          className={styles.input}
          type="text"
          value={operation.indicatedBy}
          onChange={(e) =>
            dispatch(updateOperationsWindowValue({
              property: 'indicatedBy',
              value: e.target.value
            }))
          }
        />
      </label>

      <label>
        <div className={styles.rowEqual}>
          <label className={styles.labelBox}>
            <span className={styles.label}>Cep</span>
            <Input
              placeholder="ex.: 00000-000"
              className={styles.input}
              type="text"
              value={operation.cep}
              onChange={(e) =>
                dispatch(updateOperationsWindowValue({
                  property: 'cep',
                  value: e.target.value
                }))
              }
            />
          </label>
          <label className={styles.labelBox}>
            <span className={styles.label}>Número da residencia</span>
            <Input
              placeholder="ex.: 00"
              className={styles.input}
              type="text"
              value={operation.number}
              onChange={(e) =>
                dispatch(updateOperationsWindowValue({
                  property: 'number',
                  value: e.target.value
                }))
              }
            />
          </label>
        </div>
      </label>
      <label>
        <span className={styles.label}>Rua</span>
        <Input
          placeholder="ex.: Rua João da Silva"
          className={styles.input}
          type="text"
          value={operation.street}
          onChange={(e) =>
            dispatch(updateOperationsWindowValue({
              property: 'street',
              value: e.target.value
            }))
          }
        />
      </label>
      <label>
        <div className={styles.rowEqual}>
          <label className={styles.labelBox}>
            <span className={styles.label}>Bairro</span>
            <Input
              placeholder="ex.: Centro"
              className={styles.input}
              type="text"
              value={operation.neighborhood}
              onChange={(e) =>
                dispatch(updateOperationsWindowValue({
                  property: 'neighborhood',
                  value: e.target.value
                }))
              }
            />
          </label>
          <label className={styles.labelBox}>
            <span className={styles.label}>Cidade</span>
            <Input
              placeholder="ex.: Vitória"
              className={styles.input}
              type="text"
              value={operation.city}
              onChange={(e) =>
                dispatch(updateOperationsWindowValue({
                  property: 'city',
                  value: e.target.value
                }))
              }
            />
          </label>
        </div>
      </label>
      <div className={styles.rowEqual}>
        <label className={styles.labelBox}>
          <span className={styles.label}>Estado</span>
          <Input
            placeholder="ex.: Espírito Santo"
            className={styles.input}
            type="text"
            value={operation.state}
            onChange={(e) =>
              dispatch(updateOperationsWindowValue({
                property: 'state',
                value: e.target.value
              }))
            }
          />
        </label>
        <label className={styles.labelBox}>
          <span className={styles.label}>Data de Nascimento</span>
          <DatePicker
            placeholder="Selecione a data"
            className={styles.input}
            format={dateFormatList}
            value={
              operation.birthDate
                ? dayjs(operation.birthDate)
                : undefined
            }
            onChange={(value) =>
              dispatch(updateOperationsWindowValue({
                property: 'birthDate',
                value: dayjs(value)
              }))
            }
          />
        </label>
      </div>
      <label>
        <div className={styles.rowEqual}>
          <label className={styles.labelBox}>
            <span className={styles.label}>Telefone Principal</span>
            <Input
              placeholder="ex.: (99) 99999-9999"
              className={styles.input}
              type="text"
              value={operation.primaryPhone}
              onChange={(e) =>
                dispatch(updateOperationsWindowValue({
                  property: 'primaryPhone',
                  value: e.target.value
                }))
              }
            />
          </label>
          <label className={styles.labelBox}>
            <span className={styles.label}>Telefone Secundário</span>
            <Input
              placeholder="ex.: (99) 99999-9999"
              className={styles.input}
              type="text"
              value={operation.secondaryPhone}
              onChange={(e) =>
                dispatch(updateOperationsWindowValue({
                  property: 'secondaryPhone',
                  value: e.target.value
                }))
              }
            />
          </label>
        </div>
      </label>
      <div className={styles.rowEqual}>
        <label>
          <span className={styles.label}>Email</span>
          <Input
            placeholder="ex.: joaodasilva@email.com"
            className={styles.input}
            type="email"
            value={operation.email}
            onChange={(e) =>
              dispatch(updateOperationsWindowValue({
                property: 'email',
                value: e.target.value
              }))
            }
          />
        </label>
        <label>
          <span className={styles.label}>Profissão</span>
          <Input
            placeholder="ex.: Médico"
            className={styles.input}
            type="text"
            value={operation.occupation}
            onChange={(e) =>
              dispatch(updateOperationsWindowValue({
                property: 'occupation',
                value: e.target.value
              }))
            }
          />
        </label>
      </div>
    </div>
  )
}
