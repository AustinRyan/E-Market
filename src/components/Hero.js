"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, ArrowRight } from "lucide-react";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const styles = {
    section: {
      position: "relative",
      minHeight: "100vh",
      overflow: "hidden",
      color: "white",
      fontFamily: "Arial, sans-serif",
    },
    background: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(to bottom right, #6b46c1, #4338ca, #1e3a8a)",
      zIndex: -2,
    },
    overlay: {
      position: "absolute",
      inset: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: -1,
    },
    content: {
      position: "relative",
      zIndex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      padding: "0 1rem",
      textAlign: "center",
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: 800,
      letterSpacing: "-0.025em",
      marginBottom: "1rem",
    },
    highlight: {
      background: "linear-gradient(to right, #fbbf24, #ea580c)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    subtitle: {
      fontSize: "1.25rem",
      maxWidth: "32rem",
      marginBottom: "2rem",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "1rem",
    },
    button: {
      display: "inline-flex",
      alignItems: "center",
      padding: "0.75rem 1.5rem",
      fontSize: "1rem",
      fontWeight: 600,
      borderRadius: "9999px",
      transition: "all 0.3s ease",
      cursor: "pointer",
    },
    primaryButton: {
      background: "linear-gradient(to right, #ec4899, #f97316)",
      color: "white",
      border: "none",
    },
    secondaryButton: {
      backgroundColor: "#4338ca",
      color: "#e0e7ff",
      border: "none",
    },
    icon: {
      marginLeft: "0.5rem",
    },
    scrollIndicator: {
      position: "absolute",
      bottom: "2rem",
      left: "50%",
      transform: "translateX(-50%)",
    },
  };

  return (
    <section style={styles.section}>
      <div style={styles.background}></div>
      <div style={styles.overlay}></div>
      <div style={styles.content}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            style={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Welcome to <span style={styles.highlight}>E-Market</span>
          </motion.h1>
          <motion.p
            style={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Discover amazing products tailored to your needs
          </motion.p>
          <motion.div
            style={styles.buttonContainer}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link href="/products" passHref>
              <motion.a
                style={{ ...styles.button, ...styles.primaryButton }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Shop Now <ShoppingCart style={styles.icon} size={20} />
              </motion.a>
            </Link>
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        style={styles.scrollIndicator}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </motion.svg>
      </motion.div>
    </section>
  );
}
