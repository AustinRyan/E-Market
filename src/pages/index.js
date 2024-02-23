import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import HowItWorks from "@/components/HowItWorks";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>E-Market</title>
        <meta name="E-Market" content="Shop the latest products on E-Market." />
      </Head>
      <Hero />
      <HowItWorks />
      <Testimonials />
    </div>
  );
}
