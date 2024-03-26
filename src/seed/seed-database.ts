import { initialData } from "./seed";
import prisma from "../lib/prisma";

async function main() {
  console.log("Start seeding ...");
  console.log("Clearing database");

  await Promise.all([
    prisma.productImage.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
  ]);

  //insert category
  const { categories, products } = initialData;

  const categoriData = categories.map((category) => ({
    name: category
  }));

  await prisma.category.createMany({
    data: categoriData
  });

  console.log("Seed finished");
}

(() => {
  if ((process.env.NODE_ENV = "production")) return;

  main();
})();
