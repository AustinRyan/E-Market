// pages/api/products/create.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { name, description, price, category, imageUrl } = req.body;

  try {
    // Use Prisma Client to create a new product
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        category,
        imageUrl,
      },
    });

    return res.status(201).json(product);
  } catch (error) {
    console.error("Failed to create product:", error);
    return res
      .status(500)
      .json({ message: "Failed to create product", error: error.message });
  }
}
