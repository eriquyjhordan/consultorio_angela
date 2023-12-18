import styles from "./styles.module.sass";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Select, DatePicker } from "antd";
import locale from "antd/es/date-picker/locale/pt_BR";
import type { DatePickerProps, RangePickerProps } from "antd/es/date-picker";
import { Input, Switch } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { updateVisitWindowValue } from "../../app/GlobalRedux/Features/RegisterVisit/registerSlice";
import type { RootState } from "../../app/GlobalRedux/store";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";

export default function VisitDetails() {
  const visit = useSelector((state: RootState) => state.visit);
  const dispatch = useDispatch();
  const [clients, setClients] = useState<{ label; value }[]>([]);
  const supabase = createClientComponentClient();


  const filter = (input: any, option: any) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const sort = (optionA: any, optionB: any) =>
    (optionA?.label ?? "")
      .toLowerCase()
      .localeCompare((optionB?.label ?? "").toLowerCase());

  const onChange = (
    value: DatePickerProps["value"] | RangePickerProps["value"],
    dateString: [string, string] | string
  ) => {
    dispatch(updateVisitWindowValue({ property: "date", value: dateString }));
  };

  const onOk = (
    value: DatePickerProps["value"] | RangePickerProps["value"]
  ) => {
    // console.log("onOk: ", value)
  };

  useEffect(() => {
    async function getClients() {
      const { data, error } = await supabase.from("Clients").select("name, id");
      if (data) {
        const clientsData = data.map((client) => ({
          label: client.name,
          value: client.id,
        }));
        setClients(clientsData);
      }
    }
    getClients();
  }, []);

  return (
    <div className={styles.inputs}>
      <h4>Selecione o cliente</h4>
      <Select
        showSearch
        placeholder="Pesquise o nome do cliente"
        options={clients}
        value={visit.selectedClient}
        optionFilterProp="children"
        filterOption={filter}
        filterSort={sort}
        className={styles.input}
        onChange={(label, value) => dispatch(updateVisitWindowValue({ property: "selectedClient", value: { ...label, ...value } }))}
      />
      <DatePicker
        showTime={{ format: "HH:mm" }}
        locale={locale}
        className={styles.input}
        format="DD-MM-YYYY HH:mm"
        onChange={onChange}
        onOk={onOk}
        placeholder="Selecione a data e hora da consulta"
      />
      <h4 className={styles.subtitle}>Lâminas</h4>
      <div className={styles.diseasesBox}>
        <div className={styles.diseasesItem}>
          <Switch
            checked={visit.onicomicose}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked={false}
            onChange={(value) =>
              dispatch(
                updateVisitWindowValue({ property: "onicomicose", value })
              )
            }
          />
          <p className={styles.diseaseText}>Onicomicose</p>
        </div>
        <div className={styles.diseasesItem}>
          <Switch
            checked={visit.oniciolise}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked={false}
            onChange={(value) =>
              dispatch(
                updateVisitWindowValue({ property: "oniciolise", value })
              )
            }
          />
          <p className={styles.diseaseText}>Onicólise</p>
        </div>

        <div className={styles.diseasesItem}>
          <Switch
            checked={visit.onicogrifose}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked={false}
            onChange={(value) =>
              dispatch(
                updateVisitWindowValue({ property: "onicogrifose", value })
              )
            }
          />
          <p className={styles.diseaseText}>Onicogrifose</p>
        </div>

        <p className={styles.diseaseText}>Outras Lâminas</p>
        <Input
          className={styles.observations}
          value={visit.outros}
          onChange={(e) =>
            dispatch(
              updateVisitWindowValue({
                property: "outros",
                value: e.target.value,
              })
            )
          }
          style={{ gridColumnEnd: "span 2" }}
        />
      </div>
      <div className={styles.diseasesItem} style={{ marginTop: "1rem" }}>
        <Switch
          checked={visit.desconforto}
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          defaultChecked={false}
          size="small"
          onChange={(value) =>
            dispatch(updateVisitWindowValue({ property: "desconforto", value }))
          }
        />
        <p className={styles.diseaseText}>Alguma observação sobre a consulta?</p>
      </div>
      <TextArea
        value={visit.desconfortoText}
        disabled={!visit.desconforto}
        onChange={(e) =>
          dispatch(
            updateVisitWindowValue({
              property: "desconfortoText",
              value: e.target.value,
            })
          )
        }
        rows={6}
        placeholder="Importante informar sobre qualquer desconforto ou limitação do cliente"
      />
    </div>
  );
}
