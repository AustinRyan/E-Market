import React, { useState } from "react";

import styles from "@/styles/Testimonials.module.css";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    quote:
      "This is the best e-commerce site I've ever used. Fantastic selection and seamless checkout.",
    author: "Jane Doe",
    image: "https://source.unsplash.com/random/150x150?person",
  },
  {
    id: 2,
    quote:
      "Incredible customer service and high-quality products. Highly recommend to anyone shopping online.",
    author: "John Smith",
    image: "https://source.unsplash.com/random/150x150?face",
  },
  {
    id: 3,
    quote:
      "The variety is amazing, and the prices are unbeatable. Absolutely love shopping here!",
    author: "Emma Wilson",
    image: "https://source.unsplash.com/random/150x150?woman",
  },
  {
    id: 4,
    quote:
      "I've been a loyal customer for years. The quality of the products and the service is consistently excellent.",
    author: "Michael Johnson",
    image: "https://source.unsplash.com/random/150x150?man",
  },
  {
    id: 5,
    quote:
      "The E-Market platform has made my life so much easier. I can find everything I need in one place.",
    author: "Sarah Thompson",
    image: "https://source.unsplash.com/random/150x150?girl",
  },
  {
    id: 6,
    quote:
      "The user interface on E-Market is intuitive and the website is fast. Shopping here is a breeze.",
    author: "David Anderson",
    image: "https://source.unsplash.com/random/150x150?boy",
  },
  {
    id: 7,
    quote:
      "I recommend E-Market to all my friends. It's reliable, secure, and offers great deals.",
    author: "Emily Davis",
    image: "https://source.unsplash.com/random/150x150?person",
  },
  {
    id: 8,
    quote:
      "The customer support team is amazing. They always go above and beyond to assist me with any issues.",
    author: "Alexandra Roberts",
    image: "https://source.unsplash.com/random/150x150?woman",
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToPrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex - 1 < 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex + 1 >= testimonials.length ? 0 : prevIndex + 1
    );
  };

  return (
    <div className={styles.testimonials}>
      <h2>Customer Testimonials</h2>
      <div className={styles.carousel}>
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className={`${styles.slide} ${
              index === activeIndex ? styles.activeSlide : ""
            }`}
          >
            <Image
              src={testimonial.image}
              alt={testimonial.author}
              className={styles.avatar}
              height={100}
              width={100}
            />
            <blockquote className={styles.quote}>
              <p>&quot;{testimonial.quote}&quot;</p>
              <footer className={styles.author}>- {testimonial.author}</footer>
            </blockquote>
          </div>
        ))}
      </div>
      <div className={styles.arrows}>
        <button onClick={goToPrev} className={`${styles.arrow} ${styles.prev}`}>
          {"<"}
        </button>
        <button onClick={goToNext} className={`${styles.arrow} ${styles.next}`}>
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Testimonials;
