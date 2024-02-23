import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method !== "PUT") {
    res.setHeader("Allow", ["PUT"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { name, description, price, imageUrl } = req.body;

  try {
    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: { name, description, price, imageUrl },
    });
    res.status(200).json(product);
  } catch (error) {
    console.error("Failed to update product:", error);
    res
      .status(500)
      .json({ message: "Failed to update product", error: error.message });
  }
}
