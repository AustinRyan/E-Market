import { motion } from "framer-motion";
import { Search, ShoppingCart, CreditCard } from "lucide-react";

export default function HowItWorks() {
  const styles = {
    section: {
      padding: "80px 20px",
      background: "linear-gradient(135deg, #f6f9fc 0%, #ffffff 100%)",
      minHeight: "60vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    content: {
      maxWidth: "1200px",
      margin: "0 auto",
      textAlign: "center",
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: "700",
      color: "#1a1a1a",
      marginBottom: "1rem",
      background: "linear-gradient(135deg, #2d3748 0%, #1a202c 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    subtitle: {
      fontSize: "1.25rem",
      color: "#4a5568",
      marginBottom: "4rem",
      maxWidth: "600px",
      margin: "0 auto 4rem auto",
    },
    steps: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "2rem",
      padding: "0 1rem",
    },
    step: {
      background: "white",
      borderRadius: "20px",
      padding: "2rem",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      cursor: "pointer",
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
      },
    },
    iconWrapper: {
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #e2e8f0 0%, #edf2f7 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 1.5rem auto",
    },
    icon: {
      width: "40px",
      height: "40px",
      color: "#4a5568",
    },
    stepTitle: {
      fontSize: "1.5rem",
      fontWeight: "600",
      color: "#2d3748",
      marginBottom: "1rem",
    },
    stepDescription: {
      fontSize: "1rem",
      color: "#4a5568",
      lineHeight: "1.6",
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section style={styles.section}>
      <div style={styles.content}>
        <motion.h2
          style={styles.title}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          How It Works
        </motion.h2>
        <motion.p
          style={styles.subtitle}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Discover how easy it is to shop with us.
        </motion.p>
        <motion.div
          style={styles.steps}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            style={styles.step}
            variants={stepVariants}
            whileHover={{ scale: 1.03 }}
          >
            <div style={styles.iconWrapper}>
              <Search style={styles.icon} />
            </div>
            <h3 style={styles.stepTitle}>Find Your Product</h3>
            <p style={styles.stepDescription}>
              Search from a wide range of categories.
            </p>
          </motion.div>

          <motion.div
            style={styles.step}
            variants={stepVariants}
            whileHover={{ scale: 1.03 }}
          >
            <div style={styles.iconWrapper}>
              <ShoppingCart style={styles.icon} />
            </div>
            <h3 style={styles.stepTitle}>Add to Cart</h3>
            <p style={styles.stepDescription}>Choose the products you love.</p>
          </motion.div>

          <motion.div
            style={styles.step}
            variants={stepVariants}
            whileHover={{ scale: 1.03 }}
          >
            <div style={styles.iconWrapper}>
              <CreditCard style={styles.icon} />
            </div>
            <h3 style={styles.stepTitle}>Checkout</h3>
            <p style={styles.stepDescription}>
              Pay securely through our encrypted gateway.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
