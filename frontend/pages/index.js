import Image from 'next/image';
import Hero from '../components/Hero';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    fetchJson();
  }, []);

  const fetchJson = async () => {
    const data = await fetch('https://hamsterdb.onrender.com/api/hamstersjson');
    console.log(data);
  };
  return (
    <div>
      <Head>
        <title>Hamster photo site</title>
        <meta
          name="description"
          content="Battle of cutenessnes between the worlds cutestest hamsters"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
    </div>
  );
}
