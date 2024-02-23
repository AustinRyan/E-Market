import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method !== "DELETE") {
    res.setHeader("Allow", ["DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    await prisma.product.delete({
      where: { id: Number(id) },
    });
    res.status(204).end();
  } catch (error) {
    console.error("Failed to delete product:", error);
    res
      .status(500)
      .json({ message: "Failed to delete product", error: error.message });
  }
}
