// utils/addProductsToDB.js (Create this file in your project)

async function addProductToDB(product) {
  try {
    const response = await fetch("/api/products/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Product added successfully:", data);
  } catch (error) {
    console.error("Failed to add product to DB:", error);
  }
}

export async function addProductsToDB(products) {
  for (const product of products) {
    // Map the Fake Store API product structure to your database structure
    const {
      title: name,
      description,
      price,
      category,
      image: imageUrl,
    } = product;
    await addProductToDB({ name, description, price, category, imageUrl });
  }
}
