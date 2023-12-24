import styles from "./styles.module.sass";
import { ClientInfos } from "../ClientInfos";
import { Button, Modal as AntdModal, ConfigProvider } from "antd";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import {
  resetVisitWindow,
  updateVisitWindowValue,
  updateValuesToEdit,
} from "../../app/GlobalRedux/Features/RegisterVisit/registerSlice";
import type { RootState } from "../../app/GlobalRedux/store";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react'
import { SuccessMessage } from '../ConfimationScreen'
import VisitDetails from "../VisitDetails";
import VisitFile from "../visitFile";
import dayjs from "dayjs";

export default function VisitRegister() {
  const visit = useSelector((state: RootState) => state.visit);
  const supabase = createClientComponentClient()
  const dispatch = useDispatch();
  const [visitType, setvisitType] = useState<
    "Cadastro" | "Edição" | "Exclusão"
  >("Cadastro");
  const [status, setStatus] = useState<"success" | "error">("success");

  const handleOk = async () => { };

  const handleCancel = () => {
    dispatch(
      updateVisitWindowValue({ property: "isVisitModalOpen", value: false })
    );
    dispatch(resetVisitWindow());
  };

  const handleSave = async () => {
    let fileName = '';
    if (visit.selectedClient && visit.date) {
      if (visit.tempFileName) {
        fileName = `${visit.selectedClient.value}-${visit.date}.${visit.tempFileName.split('.')[1]}`;
        fileName = fileName.replace(/\s/g, '');
        const { data, error } = await supabase
          .storage
          .from('fichas')
          .move(`temp/${visit.tempFileName}`, `fichas/${fileName}`)
        if (error) {
          setStatus('error')
          console.log('error: ',error)
          dispatch(updateVisitWindowValue({ property: "isSuccessScreenOpen", value: true }));
        }
      }
      console.log('visit date: ', dayjs((visit.date), 'DD-MM-YYYY HH:mm'))
      const { data, error }: any = await supabase.from('visit').insert([
        {
          client_id: visit.selectedClient.value,
          visit_date: dayjs((visit.date), 'DD-MM-YYYY HH:mm'),
          lamina_oniciolise: visit.oniciolise,
          lamina_onicogrifose: visit.onicogrifose,
          lamina_onicomicose: visit.onicomicose,
          outras_laminas: visit.outros,
          observacoes: visit.desconfortoText,
          visit_record_url: fileName ?  `https://dhnfwwdtvgnusxvhmbor.supabase.co/storage/v1/object/public/fichas/fichas/${fileName}` : null 
        }
      ]).select()
      if (data) {
        setStatus('success')
        dispatch(updateVisitWindowValue({ property: "isSuccessScreenOpen", value: true }));
      } else if (error) {
        setStatus('error')
        console.log('error: ',error)
        dispatch(updateVisitWindowValue({ property: "isSuccessScreenOpen", value: true }));
      }
    }
    // dispatch(
    //   updateVisitWindowValue({ property: "isVisitModalOpen", value: false })
    // );
  };
  const handleDelete = () => { };

  useEffect(() => {
    async function fetchData() {
      const { data: visitData, error } = await supabase
        .from('visit')
        .select('*')
        .eq('id', visit.visitId)
      if (visitData) {
        dispatch(updateValuesToEdit({
          date: dayjs(visitData[0].visit_date),
          ...visitData[0]
        }))
      }
    }

    fetchData()

  }, [visit.isVisitModalOpen, visit.visitId])

  return (
    <>
      <AntdModal
        open={visit.isVisitModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1200}
        style={{ top: 20 }}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <div className={styles.container}>
          {visit.isSuccessScreenOpen ? (
            <SuccessMessage operationType={visitType} status={status} />
          ) : (
            <>
              <div className={styles.header}>
                <h1 className={styles.title}>Registrar nova consulta</h1>
              </div>
              <div className={styles.infos}>
                <div>
                  <VisitDetails />
                </div>
                <div className={styles.divider}></div>
                <div>
                  <VisitFile />
                </div>
              </div>
              <footer className={styles.footer}>
                <div className={styles.buttons}>
                  <Button onClick={handleCancel}>Cancelar</Button>
                  {/* {visit.clientId && (
                    <ConfigProvider
                      theme={{
                        token: {
                          colorPrimary: "#FF4D4F",
                        },
                      }}
                    >
                      <Button type="primary" onClick={() => handleDelete()}>
                        Excluir
                      </Button>
                    </ConfigProvider>
                  )} */}
                  <Button>
                    Limpar
                  </Button>
                  <Button
                    onClick={handleSave}
                    type="primary"
                    className={styles.confirmationBtn}
                  >
                    Salvar
                  </Button>
                </div>
                <div></div>
              </footer>
            </>
          )}
        </div>
      </AntdModal>
    </>
  );
}
