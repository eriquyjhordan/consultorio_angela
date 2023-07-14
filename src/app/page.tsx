'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import styles from './styles/home.module.sass'
import { useRouter } from 'next/router';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClientComponentClient()
  async function handleLogInAzure() {
    try {
      setIsLoading(true)
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'azure',   
        options: {
          scopes: 'email',
          redirectTo: `${location.origin}/auth/callback`
        },
      },)
    } catch (error) {
        console.log(error)
        return
    }
  }
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.leftBox}>
          <h1 className={styles.title}>Controle Câmbio</h1>
          <div className={styles.image}>
            <Image
              src="/images/apxazulbranco.png"
              alt="Logo APX azul PNG"
              className={styles.apxLogo}
              width={464}
              height={96}
            />
          </div>
          <div className={styles.footer}>
            <p className={styles.version}>v1.0.0</p>
            <p className={styles.userName}></p>
          </div>
        </div>
        <div className={styles.rightBox}>
          <h2 className={styles.rightTitle}>Operacional</h2>
          <button onClick={handleLogInAzure} className={styles.button} type="button">
            {
              isLoading ? (
                <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: '#fff' }} spin />} />
              ) : (
                "Início"
              )
            }
          </button>
          <div></div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const allowedIps = ['177.39.236.1'] as any
  const ip = ctx.req.headers['x-forwarded-for'] || ctx.req.socket.remoteAddress
  if (!allowedIps.includes(ip)) {
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