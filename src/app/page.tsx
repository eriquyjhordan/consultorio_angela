'use client'
import Image from 'next/image'
import { useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Input, Spin } from 'antd';
import styles from './styles/home.module.sass'
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const supabase = createClientComponentClient()
  const router = useRouter();

  async function handleLogin(e: any) {
    e.preventDefault()
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) {
      alert(error.message)
      setIsLoading(false);
    }
    router.push('/table');
  }

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.leftBox}>
          <h1 className={styles.title}>Controle de Clientes</h1>
          <div className={styles.image}>
            <Image
              src="/images/logo_angela.png"
              alt="Logo APX azul PNG"
              className={styles.apxLogo}
              width={500}
              height={350}
            />
          </div>
          <div className={styles.footer}>
            <p className={styles.version}>v1.0.0</p>
            <p className={styles.userName}></p>
          </div>
        </div>
        <form className={styles.rightBox}>
          <h2 className={styles.rightTitle}>Login</h2>
          <label className={styles.labelBox}>
            <span className={styles.label}>Email</span>
            <Input
              className={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className={styles.labelBox}>
            <span className={styles.label}>Senha</span>
            <Input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
            />
          </label>
          <button onClick={handleLogin} className={styles.button} type="submit">
            {
              isLoading ? (
                <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: '#fff' }} spin />} />
              ) : (
                "Entrar"
              )
            }
          </button>
          <div></div>
        </form>
      </div>
    </>
  )
}
