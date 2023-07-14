'use client'
import React, { useContext, useEffect, useState } from 'react';
import styles from '../styles/table.module.sass'
import { LeftOutlined } from '@ant-design/icons'
import { Modal } from '../../components/CreateModal'
import { Table } from 'antd'
import dayjs from 'dayjs'
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useSelector, useDispatch } from 'react-redux';
import { resetOperationsWindow, updateOperationsWindowValue } from '../GlobalRedux/Features/operation/operationSlice';
import type { RootState } from '../GlobalRedux/store';

function TableScreen() {
  const operation = useSelector((state: RootState) => state.operation);
  const dispatch = useDispatch();
  const supabase = createClientComponentClient()
  const [exchangeControlId, setExchangeControlId] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [sumFinantialVolume, setSumFinantialVolume] = useState(0)
  const [averageSpread, setAverageSpread] = useState(0)
  const [operationCount, setOperationCount] = useState(0)
  const [sumRevenue, setSumRevenue] = useState(0)
  const itemsPerPage = 9

  const handleEdit = (item: any) => {
    setExchangeControlId(item.id)
    dispatch(updateOperationsWindowValue({ property: 'isModalOpen', value: true }))
  }
  
  const handlePageChange = async (page: any) => {
    setLoading(true)
    const startRange = (page - 1) * itemsPerPage
    const endRange = startRange + itemsPerPage - 1
    const { data } = await supabase.from('exchange_control')
      .select('*')
      .neq('is_deleted', true)
      .order('operation_date', { ascending: false })
      .range(startRange, endRange)
    if (data) {
      const dataFiltered = data.map((item: any) => ({
        id: item.exchange_control_id,
        key: item.exchange_control_id,
        name: item.investor_full_name.substring(0, 34) + '...',
        natureza: item.operation_nature,
        moeda: item.operation_currency,
        data_fech: dayjs(item.operation_date).toDate().toLocaleDateString(),
        volume_qtd: Number(item.operation_volume).toLocaleString(),
        volume_fin: `R$ ${Number(
          item.operation_financial_volume
        ).toLocaleString()}`,
        spot: item.operation_spot,
        tx_final: item.operation_final_rate,
        spread: Number(item.operation_spread).toFixed(4) + '%',
        receita: `R$ ${Number(item.operation_revenue).toLocaleString()}`,
      })) as any
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
      title: 'Natureza',
      dataIndex: 'natureza',
      key: 'natureza',
    },
    {
      title: 'Moeda',
      dataIndex: 'moeda',
      key: 'moeda',
    },
    {
      title: 'Data de Fechamento',
      dataIndex: 'data_fech',
      key: 'data_fech',
    },
    {
      title: 'Volume',
      dataIndex: 'volume_qtd',
      key: 'volume_qtd',
    },
    {
      title: 'Volume Financeiro',
      dataIndex: 'volume_fin',
      key: 'volume_fin',
    },
    {
      title: 'Spot',
      dataIndex: 'spot',
      key: 'spot',
    },
    {
      title: 'Taxa Final',
      dataIndex: 'tx_final',
      key: 'tx_final',
    },
    {
      title: 'Spread',
      dataIndex: 'spread',
      key: 'spread',
    },
    {
      title: 'Receita',
      dataIndex: 'receita',
      key: 'receita',
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
    setExchangeControlId('')
    dispatch(updateOperationsWindowValue({ property: 'isModalOpen', value: true }))
  }

  useEffect(() => {
    async function getTotalPages() {
      setLoading(true)
      const { data: exchange_control, error } = await supabase.from('exchange_control').select('count')
      if (exchange_control)
      setTotalPages(exchange_control[0].count)
    }
    async function fetchData() {
      const now = new Date()
      const anoAtual = now.getFullYear()
      const mesAtual = dayjs(now).format('MM')
      const { data } = await supabase
      .from('exchange_control')
      .select('*')
      .neq('is_deleted', true)
      .gte('operation_date', `${anoAtual}-${mesAtual}-01`) as any
      const somaVolumeFinanceiro = data.reduce(
        (acc: any, item: any) =>
          Number(acc) + Number(item.operation_financial_volume),
        0
      )
      const somaReceita = data.reduce(
        (acc: any, item: any) => Number(acc) + Number(item.operation_revenue),
        0
      )
      const somaSpread = data.reduce(
        (acc: any, item: any) => Number(acc) + Number(item.operation_spread),
        0
      )
      const qtdOperacoes = data.length
      setAverageSpread((somaSpread / qtdOperacoes) * 100)
      setOperationCount(qtdOperacoes)
      setSumRevenue(somaReceita)
      setSumFinantialVolume(somaVolumeFinanceiro)
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
              <p className={styles.cardLabel}>Volume Financeiro</p>
              <p className={styles.cardValue}>
                R$ {sumFinantialVolume.toLocaleString('pt-BR')}
              </p>
              {/* <div className={styles.cardTrend}>
                <p className={styles.cardTrendLabel}>trend title</p>
                <p className={styles.cardTrendValue}>23.5%</p>
              </div> */}
              <div></div>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardValues}>
              <p className={styles.cardLabel}>Spread Médio</p>
              <p className={styles.cardValue}>{averageSpread.toFixed(4)}%</p>
              {/* <div className={styles.cardTrend}>
                <p className={styles.cardTrendLabel}>trend title</p>
                <p className={styles.cardTrendValue}>5,1%</p>
              </div> */}
              <div></div>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardValues}>
              <p className={styles.cardLabel}>Receita</p>
              <p className={styles.cardValue}>
                R$ {sumRevenue.toLocaleString('pt-BR')}
              </p>
              {/* <div className={styles.cardTrend}>
                <p className={styles.cardTrendLabel}>trend title</p>
                <p className={styles.cardTrendValue}>10,57 %</p>
              </div> */}
              <div></div>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardValues}>
              <p className={styles.cardLabel}>Quantidade de Operações</p>
              <p className={styles.cardValue}>{operationCount}</p>
              {/* <div className={styles.cardTrend}>
                <p className={styles.cardTrendLabel}>trend title</p>
                <p className={styles.cardTrendValue}>70,5%</p>
              </div> */}
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
            Novo Cadastro
          </button>
        </div>
      </div>
      <Modal
        isModalOpen={operation.isModalOpen}
        exchangeControlId={exchangeControlId}
      />
    </div>
  )
}

export default TableScreen;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const allowedIps = ['177.39.236.1'] as any
  const ip = ctx.req.headers['x-forwarded-for'] || ctx.req.socket.remoteAddress
  if (allowedIps.includes(ip)) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    }
  }
  return {
    props: {},
  }
}