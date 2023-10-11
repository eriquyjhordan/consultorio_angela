'use client'
import React, { useContext, useEffect, useState } from 'react';
import styles from '../styles/table.module.sass'
import { LeftOutlined } from '@ant-design/icons'
import { Modal } from '../../components/CreateModal'
import { Table } from 'antd'
import dayjs from 'dayjs'
import Link from 'next/link';
// import { GetServerSideProps } from 'next';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useSelector, useDispatch } from 'react-redux';
import { resetOperationsWindow, updateOperationsWindowValue } from '../GlobalRedux/Features/operation/operationSlice';
import type { RootState } from '../GlobalRedux/store';

function TableScreen() {
  const operation = useSelector((state: RootState) => state.operation);
  const dispatch = useDispatch();
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  const handleEdit = (item: any) => {
    // dispatch(updateOperationsWindowValue({ property: 'exchangeId', value: item.id }))
    // dispatch(updateOperationsWindowValue({ property: 'isModalOpen', value: true }))
  }

  const handlePageChange = async (page: any) => {
    setLoading(true)
    const startRange = (page - 1) * itemsPerPage
    const endRange = startRange + itemsPerPage - 1
    const { data } = await supabase.from('Clients')
      .select('*')
      .range(startRange, endRange)
    if (data) {
      const dataFiltered = data.map((item: any) => (
        {
          id: item.id,
          key: item.id,
          primary_phone: item.primary_phone,
          name: item.name,
          birthdate: dayjs(item.birthdate).format('DD/MM/YYYY'),
        }
      )) as any
      setLoading(false)
      setData(dataFiltered)
      setCurrentPage(page)
    }
  }

  const paginationConfig = {
    pageSize: itemsPerPage,
    total: totalPages,
    current: currentPage,
    onChange: handlePageChange,
    loading,
  }

  const columns: any = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Telefone Principal',
      dataIndex: 'primary_phone',
      key: 'primary_phone',
    },
    {
      title: 'Data de Nascimento',
      dataIndex: 'birthdate',
      key: 'birthdate',
    },
    {
      title: 'Última Visita',
      dataIndex: 'visit_date',
      key: 'visit_date',
    },
    {
      title: '',
      key: 'action',
      render: (text: any, record: any) => (
        <a onClick={() => handleEdit(record)}>Editar</a>
      ),
    },
  ]

  function createNewItem() {
    dispatch(resetOperationsWindow())
    dispatch(updateOperationsWindowValue({ property: 'isModalOpen', value: true }))
  }

  useEffect(() => {
    async function getTotalPages() {
      setLoading(true)
      const { data: exchange_control, error } = await supabase.from('Clients').select('count')
      console.log('quantidade de registros: ', exchange_control)
      if (exchange_control)
        setTotalPages(exchange_control[0].count)
    }
    async function fetchData() {
      const now = new Date()
      const anoAtual = now.getFullYear()
      const mesAtual = dayjs(now).format('MM')
      const { data } = await supabase
        .from('visit')
        .select('*')
        .neq('is_deleted', true)
        .gte('visit_date', `${anoAtual}-${mesAtual}-01`) as any
    }
    getTotalPages()
    fetchData()
    handlePageChange(1)
    setLoading(false)
  }, [operation.fetchData])

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <Link href='/'>
            <LeftOutlined
              style={{
                fontSize: '2rem',
                color: '#DBD5D5',
                cursor: 'pointer',
              }}
            />
          </Link>
          <h1 className={styles.title}>Visão Geral</h1>
        </div>
        <div className={styles.cards}>
          <div className={styles.card}>
            <div className={styles.cardValues}>
              <p className={styles.cardLabel}>Consultas no Mês</p>
              <p className={styles.cardValue}>
                0
              </p>
              <div></div>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardValues}>
              <p className={styles.cardLabel}>Clientes Cadastrados</p>
              <p className={styles.cardValue}>0</p>
              <div></div>
            </div>
          </div>
        </div>
        <div className={styles.tableContainer}>
          <Table
            className={styles.table}
            columns={columns}
            dataSource={data}
            loading={loading}
            size="middle"
            pagination={paginationConfig}
          />
        </div>
        <div className={styles.bottom}>
          <button
            onClick={createNewItem}
            className={styles.button}
            type="button"
          >
            Cadastrar Cliente
          </button>
        </div>
      </div>
      <Modal
        isModalOpen={operation.isModalOpen}
      />
    </div>
  )
}

export default TableScreen;
