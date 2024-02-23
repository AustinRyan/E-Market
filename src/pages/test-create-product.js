export default function TestCreateProduct() {
  const createProduct = async () => {
    const response = await fetch("/api/products/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Example Product",
        description: "This is an example product.",
        price: 9.99,
        category: "Example Category",
        imageUrl: "http://example.com/product.jpg",
      }),
    });

    if (!response.ok) {
      console.error("Failed to create product");
      return;
    }

    const product = await response.json();
    console.log("Product created:", product);
  };

  return (
    <div>
      <button onClick={createProduct}>Create Test Product</button>
    </div>
  );
}
