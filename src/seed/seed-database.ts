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
  

  console.log("Seed finished");
}

(() => {
  if ((process.env.NODE_ENV = "production")) return;

  main();
})();
