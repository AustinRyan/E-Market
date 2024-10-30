import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  const styles = {
    main: {
      minHeight: "100vh",
      background: "linear-gradient(to bottom, #ffffff, #f8fafc)",
    },
    section: {
      position: "relative",
      zIndex: 1,
    },
    heroSection: {
      position: "relative",
      zIndex: 2,
      background: "linear-gradient(to bottom, #ffffff, #f8fafc)",
    },
    howItWorksSection: {
      position: "relative",
      zIndex: 1,
      marginTop: "-2rem",
      paddingTop: "4rem",
      background: "linear-gradient(to bottom, #f8fafc, #f1f5f9)",
    },
    testimonialsSection: {
      position: "relative",
      zIndex: 0,
      marginTop: "-2rem",
      paddingTop: "4rem",
      background: "linear-gradient(to bottom, #f1f5f9, #e2e8f0)",
    },
    curve: {
      position: "absolute",
      bottom: "-2px",
      left: 0,
      width: "100%",
      overflow: "hidden",
      lineHeight: 0,
      transform: "rotate(180deg)",
    },
    curveSvg: {
      position: "relative",
      display: "block",
      width: "calc(100% + 1.3px)",
      height: "32px",
    },
    curvePath: {
      fill: "#f1f5f9",
    },
    testimonialsPath: {
      fill: "#e2e8f0",
    },
  };

  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <main style={styles.main}>
      <section style={styles.heroSection}>
        <Hero />
        <div style={styles.curve}>
          <svg
            style={styles.curveSvg}
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              style={styles.curvePath}
            ></path>
          </svg>
        </div>
      </section>

      <motion.section
        ref={ref}
        variants={sectionVariants}
        initial="hidden"
        animate={controls}
        style={styles.howItWorksSection}
      >
        <HowItWorks />
        <div style={styles.curve}>
          <svg
            style={styles.curveSvg}
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              style={styles.testimonialsPath}
            ></path>
          </svg>
        </div>
      </motion.section>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate={controls}
        style={styles.testimonialsSection}
      >
        <Testimonials />
      </motion.section>
    </main>
  );
}
