import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({
  log: ["query", "error", "warn"],
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { name, description, price, imageUrl } = req.body;
  console.log("Creating product with data:", req.body);

  try {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
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
