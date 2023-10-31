import styles from "./styles.module.sass";
import { ClientInfos } from "../ClientInfos";
import { Button, Modal as AntdModal, ConfigProvider } from "antd";
import {
  resetVisitWindow,
  updateVisitWindowValue,
  updateValuesToEdit,
} from "../../app/GlobalRedux/Features/RegisterVisit/registerSlice";
import type { RootState } from "../../app/GlobalRedux/store";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react'
import { SuccessMessage } from '../ConfimationScreen'

export default function VisitRegister() {
  const visit = useSelector((state: RootState) => state.visit);
  const dispatch = useDispatch();
  const [visitType, setvisitType] = useState<
    "Cadastro" | "Edição" | "Exclusão"
  >("Cadastro");
  const [status, setStatus] = useState<"success" | "error">("success");

  const handleOk = () => {
    dispatch(
      updateVisitWindowValue({ property: "isVisitModalOpen", value: false })
    );
  };

  const handleCancel = () => {
    dispatch(
      updateVisitWindowValue({ property: "isVisitModalOpen", value: false })
    );
    dispatch(resetVisitWindow());
  };

    const handleSave = () => {};
    const handleDelete = () => {};

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
              {/* <div className={styles.infos}>
                <visitInformation />
                <div className={styles.divider}></div>
                <ClientInfos />
              </div> */}
              <div>
                <h1>content</h1>
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
                    {/* {visit.clientId ? "Salvar" : "Cadastrar"} */}
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
