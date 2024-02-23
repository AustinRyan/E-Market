import React from "react";
import Link from "next/link";
import styles from "@/styles/Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.textContent}>
          <h1>Welcome to E-Market</h1>
          <p>Find the best products for your needs on our products page</p>
        </div>
        <Link href="/products" legacyBehavior>
          <a className={styles.ctaButton}>Shop Now</a>
        </Link>
      </div>
    </section>
  );
}
