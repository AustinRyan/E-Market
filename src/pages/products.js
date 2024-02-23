import React, { useState, useEffect } from "react";
import styles from "@/styles/ProductsPage.module.css";
import Modal from "@/components/Modal";
import Spinner from "@/components/Spinner";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

const fetchProducts = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  return data;
};

const ProductsPage = () => {
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setIsLoading(false);
    });
  }, []);
  if (isLoading) {
    return <Spinner />;
  }

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  return (
    <div className={styles.productsPage}>
      <div className={styles.heroSection}>
        <h1>Explore Our Featured Products</h1>
        <p>Discover the best products selected just for you.</p>
      </div>
      <div className={styles.productsGrid}>
        {products.map((product) => (
          <div
            key={product.id}
            className={styles.productCard}
            onClick={() => handleProductClick(product)}
          >
            <Image
              src={product.image}
              alt={product.title}
              className={styles.productImage}
              height={500}
              width={500}
            />
            <div className={styles.productInfo}>
              <h3>{product.title}</h3>
              <p>{product.description.substring(0, 100)}...</p>
              <span>${product.price}</span>
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedProduct && (
          <div className={styles.modalContent}>
            <div className={styles.modalImageContainer}>
              <Image
                src={selectedProduct.image}
                alt={selectedProduct.title}
                className={styles.modalImage}
                height={500}
                width={500}
                quality={100} // Increases the quality, default is 75
              />
            </div>
            <div className={styles.modalDetails}>
              <h3>{selectedProduct.title}</h3>
              <p>{selectedProduct.description}</p>
              <span>${selectedProduct.price}</span>
              <button
                className={styles.modalAddToCartButton}
                onClick={() => addToCart(selectedProduct)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ProductsPage;
