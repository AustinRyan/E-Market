// Spinner.js
import React from "react";
import styles from "@/styles/Spinner.module.css";

const Spinner = () => (
  <div className={styles.spinner}>
    <div className={styles.loader}></div>
  </div>
);
export default Spinner;
