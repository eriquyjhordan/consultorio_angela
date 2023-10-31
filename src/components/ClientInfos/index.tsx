import { Input, Switch } from 'antd'
import styles from './styles.module.sass'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { updateOperationsWindowValue } from '../../app/GlobalRedux/Features/operation/operationSlice';
import type { RootState } from '../../app/GlobalRedux/store';

const { TextArea } = Input;

export function ClientInfos() {
  const operation = useSelector((state: RootState) => state.operation);
  const dispatch = useDispatch();

  return (
    <div className={styles.outputs}>
      <h2 className={styles.subTitle}>Diagnóstico</h2>
      <h4 className={styles.diseaseText}>Tem alguma doença?</h4>
      <div className={styles.diseasesBox}>
        <div className={styles.diseasesItem}>
          <Switch
            checked={operation.vacinas}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked={false}
            onChange={(value) => dispatch(updateOperationsWindowValue({ property: 'vacinas', value }))}
          />
          <p className={styles.diseaseText}>Vacinas (Tétano)</p>
        </div>
        <div className={styles.diseasesItem}>
          <Switch
            checked={operation.alergias}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked={false}
            onChange={(value) => dispatch(updateOperationsWindowValue({ property: 'alergias', value }))}
          />
          <p className={styles.diseaseText}>Alergias</p>
        </div>

        <div className={styles.diseasesItem}>
          <Switch
            checked={operation.cirurgias}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked={false}
            onChange={(value) => dispatch(updateOperationsWindowValue({ property: 'cirurgias', value }))}
          />
          <p className={styles.diseaseText}>Cirurgias</p>
        </div>
        <div className={styles.diseasesItem}>
          <Switch
            checked={operation.hepatite}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked={false}
            onChange={(value) => dispatch(updateOperationsWindowValue({ property: 'hepatite', value }))}
          />
          <p className={styles.diseaseText}>Hepatite A/B/C</p>
        </div>
        <div className={styles.diseasesItem}>
          <Switch
            checked={operation.diabetes}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked={false}
            onChange={(value) => dispatch(updateOperationsWindowValue({ property: 'diabetes', value }))}
          />
          <p className={styles.diseaseText}>Diabetes</p>
        </div>

        <div className={styles.diseasesItem}>
          <Switch
            checked={operation.hipertencao}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked={false}
            onChange={(value) => dispatch(updateOperationsWindowValue({ property: 'hipertencao', value }))}
          />
          <p className={styles.diseaseText}>Hipertensão</p>
        </div>
        <div className={styles.diseasesItem}>
          <Switch
            checked={operation.doencasVasculares}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked={false}
            onChange={(value) => dispatch(updateOperationsWindowValue({ property: 'doencasVasculares', value }))}
          />
          <p className={styles.diseaseText}>Doenças Vasculares</p>
        </div>
        <Input
          className={styles.observations}
          value={operation.diseaseObservation}
          onChange={(e) => dispatch(updateOperationsWindowValue({ property: 'diseaseObservation', value: e.target.value }))}
          style={{ gridColumnEnd: 'span 2' }} />
      </div>
      <h2 className={styles.diseaseText}>Característica dos pés</h2>
      <div className={styles.diseasesBox}>
        <div className={styles.diseasesItem}>
          <Switch
            checked={operation.pePlano}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked={false}
            onChange={(value) => dispatch(updateOperationsWindowValue({ property: 'pePlano', value }))}
          />
          <p className={styles.diseaseText}>Pé plano</p>
        </div>
        <div className={styles.diseasesItem}>
          <Switch
            checked={operation.peValgo}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked={false}
            onChange={(value) => dispatch(updateOperationsWindowValue({ property: 'peValgo', value }))}
          />
          <p className={styles.diseaseText}>Pé Valgo</p>
        </div>
        <div className={styles.diseasesItem}>
          <Switch
            checked={operation.peCavo}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked={false}
            onChange={(value) => dispatch(updateOperationsWindowValue({ property: 'peCavo', value }))}
          />
          <p className={styles.diseaseText}>Pé cavo</p>
        </div>
        <div className={styles.diseasesItem}>
          <Switch
            checked={operation.peEsquino}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked={false}
            onChange={(value) => dispatch(updateOperationsWindowValue({ property: 'peEsquino', value }))}
          />
          <p className={styles.diseaseText}>Pé equino</p>
        </div>
        <div className={styles.diseasesItem}>
          <Switch
            checked={operation.peVaro}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked={false}
            onChange={(value) => dispatch(updateOperationsWindowValue({ property: 'peVaro', value }))}
          />
          <p className={styles.diseaseText}>Pé varo</p>
        </div>
        <div className={styles.diseasesItem}>
          <Switch
            checked={operation.halluxValgus}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked={false}
            onChange={(value) => dispatch(updateOperationsWindowValue({ property: 'halluxValgus', value }))}
          />
          <p className={styles.diseaseText}>Hallux Valgus</p>
        </div>
      </div>
      <TextArea 
      value={operation.clientObservation}
      onChange={(e) => dispatch(updateOperationsWindowValue({ property: 'clientObservation', value: e.target.value }))}
      rows={6} 
      placeholder="Observações sobre o cliente" />
    </div>
  )
}
