import React from "react";
import styles from "@/styles/Home.module.css";

export default function HowItWorks() {
  return (
    <section className={styles.howItWorks}>
      <div className={styles.content}>
        <h2>How It Works</h2>
        <p>Discover how easy it is to shop with us.</p>
        <div className={styles.steps}>
          <div className={styles.step}>
            <span className={styles.icon}>🔍</span>
            <h3>Find Your Product</h3>
            <p>Search from a wide range of categories.</p>
          </div>
          <div className={styles.step}>
            <span className={styles.icon}>🛒</span>
            <h3>Add to Cart</h3>
            <p>Choose the products you love.</p>
          </div>
          <div className={styles.step}>
            <span className={styles.icon}>💳</span>
            <h3>Checkout</h3>
            <p>Pay securely through our encrypted gateway.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
