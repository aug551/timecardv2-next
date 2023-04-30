import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import useSWR, { mutate } from 'swr';
import storage from '../../lib/storage';
import Login from './login';
import { useEffect, useState } from 'react';


export default function Home() {
  const { data: emp, error, isLoading } = useSWR("emp", storage);
  return (
    <>
      <Head>
        <title>Scheduling System | Restaurant Kiku</title>
        <meta name="description" content="Kiku scheduling system" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main}`}>
        {(isLoading) ? <></> : (!!emp) ? "Dashboard" : <Login />}
        <button onClick={() => {
          const newEmp = JSON.stringify({ data: 'emp' });
          localStorage.setItem('emp', newEmp);
          mutate('emp', newEmp)
        }}>Set Emp</button>
      </main>
    </>
  )
}
