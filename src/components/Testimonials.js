import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote:
      "This is the best e-commerce site I've ever used. Fantastic selection and seamless checkout.",
    author: "Jane Doe",
    role: "Verified Customer",
    image: "https://picsum.photos/150/150",
  },
  {
    id: 2,
    quote:
      "Incredible customer service and high-quality products. Highly recommend to anyone shopping online.",
    author: "John Smith",
    role: "Regular Shopper",
    image: "https://picsum.photos/150/150",
  },
  {
    id: 3,
    quote:
      "The variety is amazing, and the prices are unbeatable. Absolutely love shopping here!",
    author: "Emma Wilson",
    role: "Fashion Enthusiast",
    image: "https://picsum.photos/150/150",
  },
  {
    id: 4,
    quote:
      "I've been a loyal customer for years. The quality of the products and the service is consistently excellent.",
    author: "Michael Johnson",
    role: "Premium Member",
    image: "https://picsum.photos/150/150",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const styles = {
    section: {
      position: "relative",
      padding: "4rem 1rem",
      background: "linear-gradient(to bottom, #f8fafc, #ffffff)",
      overflow: "hidden",
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      position: "relative",
    },
    header: {
      textAlign: "center",
      marginBottom: "3rem",
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: "700",
      background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      marginBottom: "1rem",
    },
    subtitle: {
      fontSize: "1.125rem",
      color: "#64748b",
      maxWidth: "600px",
      margin: "0 auto",
    },
    testimonialContainer: {
      position: "relative",
      height: "400px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    testimonial: {
      position: "absolute",
      width: "100%",
      maxWidth: "800px",
      padding: "2rem",
      background: "white",
      borderRadius: "20px",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)",
    },
    quoteIcon: {
      position: "absolute",
      top: "-1rem",
      left: "-1rem",
      background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
      padding: "1rem",
      borderRadius: "50%",
      color: "white",
    },
    quote: {
      fontSize: "1.25rem",
      lineHeight: "1.75",
      color: "#1e293b",
      marginBottom: "2rem",
      fontStyle: "italic",
    },
    author: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
    },
    avatar: {
      borderRadius: "50%",
      border: "2px solid #e2e8f0",
    },
    info: {
      display: "flex",
      flexDirection: "column",
    },
    name: {
      fontWeight: "600",
      color: "#1e293b",
    },
    role: {
      color: "#64748b",
      fontSize: "0.875rem",
    },
    button: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      background: "white",
      border: "none",
      borderRadius: "50%",
      width: "3rem",
      height: "3rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.2s",
      ":hover": {
        transform: "translateY(-50%) scale(1.1)",
      },
    },
    prevButton: {
      left: "0",
    },
    nextButton: {
      right: "0",
    },
    dots: {
      display: "flex",
      justifyContent: "center",
      gap: "0.5rem",
      marginTop: "2rem",
    },
    dot: {
      width: "0.5rem",
      height: "0.5rem",
      borderRadius: "50%",
      backgroundColor: "#e2e8f0",
      transition: "all 0.3s ease",
      cursor: "pointer",
    },
    activeDot: {
      backgroundColor: "#3b82f6",
      transform: "scale(1.5)",
    },
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <header style={styles.header}>
          <h2 style={styles.title}>What Our Customers Say</h2>
          <p style={styles.subtitle}>
            Discover why thousands of customers trust us for their shopping
            needs
          </p>
        </header>

        <div style={styles.testimonialContainer}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              style={styles.testimonial}
            >
              <div style={styles.quoteIcon}>
                <Quote size={24} />
              </div>
              <p style={styles.quote}>{testimonials[currentIndex].quote}</p>
              <div style={styles.author}>
                <Image
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].author}
                  width={60}
                  height={60}
                  style={styles.avatar}
                />
                <div style={styles.info}>
                  <span style={styles.name}>
                    {testimonials[currentIndex].author}
                  </span>
                  <span style={styles.role}>
                    {testimonials[currentIndex].role}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={handlePrev}
            style={{ ...styles.button, ...styles.prevButton }}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            style={{ ...styles.button, ...styles.nextButton }}
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div style={styles.dots}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentIndex(index);
              }}
              style={{
                ...styles.dot,
                ...(index === currentIndex ? styles.activeDot : {}),
              }}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
