import React, { useState, useEffect } from "react";
import styles from "@/styles/FeaturedProducts.module.css";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) =>
        console.error("Error loading featured products:", error)
      );
  }, []);

  return (
    <div className={styles.featured}>
      <h2>Featured Products</h2>
      <div className={styles.productsGrid}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <img
              src={product.image}
              alt={product.title}
              className={styles.productImage}
            />
            <div className={styles.productInfo}>
              <h3>{product.title}</h3>
              <p>{product.description.substring(0, 100)}...</p>
              <span>${product.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
