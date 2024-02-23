import React, { useState, useEffect, useCallback } from "react";
import styles from "@/styles/ProductsPage.module.css";
import Modal from "@/components/Modal";
import Spinner from "@/components/Spinner";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductsPage = () => {
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
          name: product.title + "(Added by a user)",
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

      // Refetch products to include the new product
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

  const handleAddNewProductClick = useCallback(() => {
    setIsAddNewProductModalOpen(true);
  }, []);

  const handleNewProductChange = useCallback((e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  }, []);

  // const handleAddNewProductSubmit = useCallback(
  //   async (e) => {
  //     e.preventDefault();
  //     await addProductToDB(newProduct);
  //     setIsAddNewProductModalOpen(false);
  //   },
  //   [newProduct]
  // );
  const handleAddNewProductSubmit = async (e) => {
    e.preventDefault();
    await addProductToDB(newProduct);
    setIsAddNewProductModalOpen(false);
    setNewProduct({ title: "", description: "", price: 0, imageUrl: "" }); // Reset form
  };

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

      <div className={styles.heroSection}>
        <h1>Explore Our Featured Products</h1>
        <p>
          Discover the best products selected just for you. (Or even add new
          items to the Database!)
        </p>
      </div>
      <div className={styles.productsGrid}>
        {products.map((product) => (
          <div
            key={product.id}
            className={styles.productCard}
            onClick={() => handleProductClick(product)}
          >
            <Image
              src={product.imageUrl}
              alt={product.name}
              className={styles.productImage}
              height={500}
              width={500}
            />
            <div className={styles.productInfo}>
              <h3>{product.name}</h3>
              <p>{product.description.substring(0, 100)}...</p>
              <span>${product.price}</span>
            </div>
          </div>
        ))}
        <div className={styles.productCard} onClick={handleAddNewProductClick}>
          <div className={styles.addNewProduct}>+ Add New Product</div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedProduct && (
          <div className={styles.modalContent}>
            <div className={styles.modalImageContainer}>
              <Image
                src={selectedProduct.imageUrl}
                alt={selectedProduct.name}
                className={styles.modalImage}
                height={500}
                width={500}
                quality={100}
              />
            </div>
            <div className={styles.modalDetails}>
              <h3>{selectedProduct.name}</h3>
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
      <Modal
        isOpen={isAddNewProductModalOpen}
        onClose={() => setIsAddNewProductModalOpen(false)}
      >
        <form className={styles.modalForm} onSubmit={handleAddNewProductSubmit}>
          <input
            name="title"
            placeholder="Title"
            value={newProduct.name}
            onChange={handleNewProductChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={newProduct.description}
            onChange={handleNewProductChange}
          />
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleNewProductChange}
          />
          <input
            name="imageUrl"
            placeholder="Image URL"
            value={newProduct.imageUrl}
            onChange={handleNewProductChange}
          />
          <button type="submit">Submit</button>
        </form>
      </Modal>
    </div>
  );
};

export default ProductsPage;
