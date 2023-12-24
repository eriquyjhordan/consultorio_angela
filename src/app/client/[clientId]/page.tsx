'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { MdArrowBack, MdLocationPin, MdCake, MdPhone, MdEmail, MdWhatsapp } from 'react-icons/md';
import styles from './styles.module.sass';
import Image from 'next/image';
import dayjs from 'dayjs';
import { Modal } from '../../../components/CreateModal'
import { useSelector, useDispatch } from 'react-redux';
import { updateOperationsWindowValue } from '../../GlobalRedux/Features/operation/operationSlice';
import type { RootState } from '../../GlobalRedux/store';
import { updateVisitWindowValue, resetVisitWindow } from '../../GlobalRedux/Features/RegisterVisit/registerSlice';
import { Button, Table } from 'antd';
import VisitRegister from '@/components/VisitRegister';


type ClientProps = {
  id: string;
  name: string;
  birthdate: string;
  occupation: string;
  address: string;
  neighborhood: string;
  city: string;
  zipcode: string;
  state: string;
  primary_phone: string;
  secondary_phone: string;
  email: string;
  indicated_by: string;
  vacina_tetano: Boolean;
  alergias: Boolean;
  cirurgias: Boolean;
  hepatite: Boolean;
  diabetes: Boolean;
  hipertencao: Boolean;
  doencasVasculares: Boolean;
  diseaseObservation: string;
  pePlano: Boolean;
  peCavo: Boolean;
  peEsquino: Boolean;
  peValgo: Boolean;
  peVaro: Boolean;
  halluxValgus: Boolean;
  clientObservation: string;
  cpf: string;
  number: string;
}




async function getClientData(clientId: string) {
  const supabase = createClientComponentClient()
  const { data, error } = await supabase
    .from('Clients')
    .select('*')
    .eq('id', clientId)
  return data
}

async function getVisitsData(clientId: string) {
  const supabase = createClientComponentClient()
  const { data, error } = await supabase
    .from('visit')
    .select('*')
    .eq('client_id', clientId)
    .order('visit_date', { ascending: false })
  return data
}

function handlePageChange(page: number) {
  console.log('page: ', page)
}



export default function Client({ params }) {
  const [clientData, setClientData] = useState<ClientProps>(null)
  const [visitsData, setVisitsData] = useState<any>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const [loading, setLoading] = useState(false)
  const operation = useSelector((state: RootState) => state.operation);
  const dispatch = useDispatch();

  function handleEdit(record: any) {
    dispatch(updateVisitWindowValue({ property: 'visitId', value: record.id }))
    dispatch(updateVisitWindowValue({ property: 'isVisitModalOpen', value: true }))
  }

  function registerNewVisit() {
    dispatch(resetVisitWindow())
    dispatch(updateVisitWindowValue({ property: 'isVisitModalOpen', value: true }))
  }


  const paginationConfig = {
    pageSize: 9,
    total: totalItems,
    current: currentPage,
    onChange: handlePageChange,
    loading,
  }

  const columns: any = [
    {
      title: 'Nome',
      key: 'name',
      render: (text: any, record: any) => (
        <p>{clientData.name}</p>
      )
    },
    {
      title: 'Data da Visita',
      key: 'visit_date',
      render: (text: any, record: any) => (
        <p>{dayjs(record.visit_date).format('DD/MM/YYYY HH:mm')}</p>
      )
    },
    {
      title: 'Observações',
      dataIndex: 'observacoes',
      key: 'observacoes',
    },
    {
      title: 'Imagem da Ficha',
      key: 'visit_record_url',
      render: (text: any, record: any) => (
        <a href={record.visit_record_url ? record.visit_record_url : null} target='_blank'>Imagem</a>
      )
    },
    {
      title: '',
      key: 'action',
      render: (text: any, record: any) => (
        <a onClick={() => handleEdit(record)}>Editar</a>
      ),
    },
  ]

  useEffect(() => {
    setLoading(true)
    getClientData(params.clientId).then(data => setClientData(data[0]));
    getVisitsData(params.clientId).then(data => {
      setVisitsData(data)
      setTotalItems(data?.length)
    });
    setLoading(false)
  }, [params.clientId]);


  if (!clientData) return <p>Carregando...</p>
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>

        <Link
          href="/table"
          className={styles.backButton}
        >
          <MdArrowBack size={24} />
          <p>Perfil do Cliente</p>
        </Link>
        <div className={styles.sides}>
          <div className={styles.left}>
            <div className={styles.card}>
              <a
                href={null}
                onClick={() => {
                  dispatch(updateOperationsWindowValue({ property: 'clientId', value: clientData.id }))
                  dispatch(updateOperationsWindowValue({ property: 'isModalOpen', value: true }))
                }}
                className={styles.editBtn}
              >
                Editar perfil</a>
              <Image
                src={`https://ui-avatars.com/api/?name=${clientData.name}&size=128&background=random&color=ffffff&rounded=true`}
                alt='Iniciais do cliente'
                width={128}
                height={128}
                style={{ marginTop: '1rem' }}
              />
              <p className={styles.clientName}>{clientData.name}</p>
              <p className={styles.clientOccupation}>{clientData.occupation}</p>
              <div className={styles.line} />
              <a
                className={styles.address}
                href={`https://www.google.com/maps/search/?api=1&query=${clientData.address}, ${clientData.number} - ${clientData.city}/${clientData.state}`}
                target='_blank'
                rel='noreferrer'
              >
                <MdLocationPin size={24} color='#D9D9D9' />
                <p>{clientData.address}, {clientData.number} - {clientData.city}/{clientData.state}</p>
              </a>
              <div className={styles.line} />
              <div className={styles.basicInfo}>
                <div className={styles.textAndIcon}>
                  <MdCake size={24} color='#D9D9D9' />
                  <p>{clientData.birthdate ? dayjs(clientData.birthdate).format('DD/MM/YYYY') : 'Não cadastrado'}</p>
                </div>
                <div className={styles.textAndIcon}>
                  <MdPhone size={24} color='#D9D9D9' />
                  <p>{clientData.primary_phone ? clientData.primary_phone : 'Não cadastrado'}</p>
                </div>
                <div className={styles.textAndIcon}>
                  <MdEmail size={24} color='#D9D9D9' />
                  <p>{clientData.email ? clientData.email : 'Não cadastrado'}</p>
                </div>
              </div>
              <div className={styles.footer}>
                <div className={styles.line} />
                <a
                  className={styles.textAndIcon}
                  href={clientData.primary_phone ? `https://wa.me/55${clientData.primary_phone}` : null}
                  target='_blank'
                  rel='noreferrer'
                >
                  <MdWhatsapp size={24} color='#975F97' />
                  <p>Enviar mensagem</p>
                </a>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.line} style={{ width: '100%' }} />
            <div className={styles.header}>
              <div className={styles.stats}>
                <p className={styles.title}>{visitsData ? visitsData.length : ''}</p>
                <p className={styles.subtitle}>Visita(s)</p>
              </div>
              <div className={styles.stats}>
                <p className={styles.title}>{visitsData && visitsData.length > 0 ? dayjs(visitsData[0].visit_date).format('DD/MM/YYYY') : 'Não cadastrada'}</p>
                <p className={styles.subtitle}>Última visita</p>
              </div>
            </div>
            <div className={styles.line} style={{ width: '100%' }} />

            {/* table */}
            <Table
              className={styles.table}
              columns={columns}
              dataSource={visitsData}
              loading={loading}
              size="middle"
              pagination={paginationConfig}
            />
            <Button
              onClick={registerNewVisit}
              className={styles.button}
              type="primary"
              ghost
            >
              Registrar Consulta
            </Button>
          </div>
        </div>
      </div>
      <Modal
        isModalOpen={operation.isModalOpen}
      />
      <VisitRegister />
    </div>
  )
}