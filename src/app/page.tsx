"use client";
import Image from "next/image";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Input, Spin } from "antd";
import styles from "./styles/home.module.sass";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const supabase = createClientComponentClient();
  const router = useRouter();

  const disabled = (!email || password.length < 8) || isLoading;

  async function handleLogin(e: any) {
    e.preventDefault();
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert('Email ou senha incorretos');
      setIsLoading(false);
    } else {
      router.push("/table");
    }
  }

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.leftBox}>
          <div className={styles.image}>
            <Image
              src="/images/logo_angela_texto.svg"
              alt="Logo Angela"
              width={519}
              height={520}
            />
          </div>
        </div>
        <form className={styles.rightBox}>
          <h2 className={styles.rightTitle}>Bem-vinda!</h2>
          <p className={styles.rightText}>Entre com suas credenciais abaixo</p>
          <Image
            src="/images/logo_angela_pes.svg"
            alt="Logo Angela pés"
            className={styles.logoPes}
            width={214}
            height={128}
          />
          <div className={styles.inputs}>
            <label className={styles.labelBox}>
              <span className={styles.label}>Email</span>
              <Input
                placeholder="exemplo@exemplo.com"
                type="email"
                value={email}
                className={styles.input}
                onChange={(e) => setEmail(e.target.value)}
                prefix={<UserOutlined />}
              />
            </label>
            <label className={styles.labelBox}>
              <span className={styles.label}>Senha</span>
              <Input.Password
                className={styles.input}
                placeholder="Insira sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </label>
          </div>
          <button onClick={handleLogin} disabled={disabled} className={styles.button} type="submit">
            {isLoading ? (
              <Spin
                indicator={
                  <LoadingOutlined
                    style={{ fontSize: 24, color: "#fff" }}
                    spin
                  />
                }
              />
            ) : (
              "Entrar"
            )}
          </button>
          <div></div>
        </form>
      </div>
    </>
  );
}
