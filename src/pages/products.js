import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Plus, X, ShoppingCart, Search, Tag } from "lucide-react";

const ProductsPage = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddNewProductModalOpen, setIsAddNewProductModalOpen] =
    useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: 0,
    imageUrl: "",
  });

  const fetchProducts = async () => {
    const response = await fetch("/api/products/getall");
    const data = await response.json();
    return data;
  };

  const addProductToDB = async (product) => {
    try {
      const imageUrl = /^(http:\/\/|https:\/\/)/.test(product.imageUrl)
        ? product.imageUrl
        : "/" + product.imageUrl;

      const response = await fetch("/api/products/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: product.title + " (Added by a user)",
          description: product.description,
          price: parseFloat(product.price),
          imageUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add product to database");
      }

      const data = await response.json();
      console.log("Product successfully added to the database:", data);
      toast.success(`${product.title} added to database!`);

      fetchProductsAndUpdateState();
    } catch (error) {
      console.error("Error adding product to database:", error);
      toast.error("Failed to add product to database.");
    }
  };

  const fetchProductsAndUpdateState = async () => {
    const data = await fetchProducts();
    setProducts(data);
  };

  const handleAddNewProductClick = useCallback(() => {
    setIsAddNewProductModalOpen(true);
  }, []);

  const handleNewProductChange = useCallback((e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleAddNewProductSubmit = async (e) => {
    e.preventDefault();
    await addProductToDB(newProduct);
    setIsAddNewProductModalOpen(false);
    setNewProduct({ title: "", description: "", price: 0, imageUrl: "" });
  };

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setIsLoading(false);
    });
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const styles = {
    productsPage: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "2rem",
    },
    heroSection: {
      textAlign: "center",
      marginBottom: "3rem",
    },
    heroTitle: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      marginBottom: "1rem",
      background: "linear-gradient(45deg, #3b82f6, #10b981)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    heroSubtitle: {
      fontSize: "1.2rem",
      color: "#6b7280",
    },
    productsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: "2rem",
    },
    productCard: {
      background: "white",
      borderRadius: "0.5rem",
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      overflow: "hidden",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      cursor: "pointer",
      ":hover": {
        transform: "translateY(-5px)",
        boxShadow:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
    },
    productImage: {
      width: "100%",
      height: "200px",
      objectFit: "cover",
    },
    productInfo: {
      padding: "1rem",
    },
    productTitle: {
      fontSize: "1.2rem",
      fontWeight: "bold",
      marginBottom: "0.5rem",
    },
    productDescription: {
      fontSize: "0.9rem",
      color: "#6b7280",
      marginBottom: "0.5rem",
    },
    productPrice: {
      fontSize: "1.1rem",
      fontWeight: "bold",
      color: "#10b981",
    },
    addNewProduct: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      background: "linear-gradient(45deg, #3b82f6, #10b981)",
      color: "white",
      borderRadius: "0.5rem",
      transition: "transform 0.3s ease",
      ":hover": {
        transform: "scale(1.05)",
      },
    },
    addNewProductIcon: {
      marginBottom: "0.5rem",
    },
    modal: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    },
    modalContent: {
      background: "white",
      borderRadius: "0.5rem",
      padding: "2rem",
      maxWidth: "500px",
      width: "90%",
      maxHeight: "90vh",
      overflow: "auto",
    },
    modalCloseButton: {
      position: "relative",
      top: "1rem",
      right: "1rem",
      background: "none",
      border: "none",
      fontSize: "1.5rem",
      cursor: "pointer",
    },
    modalForm: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    input: {
      padding: "0.5rem",
      borderRadius: "0.25rem",
      border: "1px solid #d1d5db",
    },
    submitButton: {
      padding: "0.5rem 1rem",
      background: "linear-gradient(45deg, #3b82f6, #10b981)",
      color: "white",
      border: "none",
      borderRadius: "0.25rem",
      cursor: "pointer",
      transition: "background 0.3s ease",
      ":hover": {
        background: "linear-gradient(45deg, #2563eb, #059669)",
      },
    },
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Search size={48} />
        </motion.div>
      </div>
    );
  }

  return (
    <div style={styles.productsPage}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div style={styles.heroSection}>
        <h1 style={styles.heroTitle}>Explore Our Featured Products</h1>
        <p style={styles.heroSubtitle}>
          Discover the best products selected just for you. (Or even add new
          items to the Database!)
        </p>
      </div>

      <motion.div
        style={styles.productsGrid}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            style={styles.productCard}
            whileHover={{ scale: 1.05 }}
            onClick={() => handleProductClick(product)}
          >
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={250}
              height={200}
              style={styles.productImage}
            />
            <div style={styles.productInfo}>
              <h3 style={styles.productTitle}>{product.name}</h3>
              <p style={styles.productDescription}>
                {product.description.substring(0, 100)}...
              </p>
              <span style={styles.productPrice}>${product.price}</span>
            </div>
          </motion.div>
        ))}
        <motion.div
          style={styles.productCard}
          whileHover={{ scale: 1.05 }}
          onClick={handleAddNewProductClick}
        >
          <div style={styles.addNewProduct}>
            <Plus size={48} style={styles.addNewProductIcon} />
            <span>Add New Product</span>
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            style={styles.modal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              style={styles.modalContent}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <button
                style={styles.modalCloseButton}
                onClick={() => setIsModalOpen(false)}
              >
                <X size={24} />
              </button>
              {selectedProduct && (
                <div>
                  <Image
                    src={selectedProduct.imageUrl}
                    alt={selectedProduct.name}
                    width={400}
                    height={300}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "0.5rem",
                      marginBottom: "1rem",
                    }}
                  />
                  <h3 style={styles.productTitle}>{selectedProduct.name}</h3>
                  <p style={styles.productDescription}>
                    {selectedProduct.description}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: "1rem",
                    }}
                  >
                    <span style={styles.productPrice}>
                      ${selectedProduct.price}
                    </span>
                    <button
                      style={{
                        ...styles.submitButton,
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                      onClick={() => {
                        addToCart(selectedProduct);
                        toast.success(`${selectedProduct.name} added to cart!`);
                      }}
                    >
                      <ShoppingCart size={18} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAddNewProductModalOpen && (
          <motion.div
            style={styles.modal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              style={styles.modalContent}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <button
                style={styles.modalCloseButton}
                onClick={() => setIsAddNewProductModalOpen(false)}
              >
                <X size={24} />
              </button>
              <h3 style={{ ...styles.productTitle, marginBottom: "1rem" }}>
                Add New Product
              </h3>
              <form
                style={styles.modalForm}
                onSubmit={handleAddNewProductSubmit}
              >
                <input
                  style={styles.input}
                  name="title"
                  placeholder="Title"
                  value={newProduct.title}
                  onChange={handleNewProductChange}
                />
                <textarea
                  style={{ ...styles.input, minHeight: "100px" }}
                  name="description"
                  placeholder="Description"
                  value={newProduct.description}
                  onChange={handleNewProductChange}
                />
                <input
                  style={styles.input}
                  name="price"
                  type="number"
                  placeholder="Price"
                  value={newProduct.price}
                  onChange={handleNewProductChange}
                />
                <input
                  style={styles.input}
                  name="imageUrl"
                  placeholder="Image URL"
                  value={newProduct.imageUrl}
                  onChange={handleNewProductChange}
                />
                <button type="submit" style={styles.submitButton}>
                  Submit
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductsPage;
