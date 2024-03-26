import { initialData } from "./seed";
import prisma from "../lib/prisma";

async function main() {
  console.log("Start seeding ...");
  console.log("Clearing database");

  //await Promise.all([
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  //]);

  //insert category
  const { categories, products } = initialData;

  const categoriData = categories.map((category) => ({
    name: category
  }));

  await prisma.category.createMany({
    data: categoriData
  });

  //get category from database, for get id the category
  const categoryDB = await prisma.category.findMany();

  const categoryMap = categoryDB.reduce((map, category) => {
    map[category.name.toLocaleLowerCase()] = category.id
    return map
  }, {} as Record<string, string>); // <string=nameCategory, string =categoryID>
  console.log(categoryMap);

  products.forEach(async (product) => {
    const { type, images, ...rest } = product;
    const dbProducto = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoryMap[type]
      }
    });
    //add images
    const imageData = images.map(image => ({
      url: image,
      productId: dbProducto.id
    }));

    await prisma.productImage.createMany({
      data: imageData
    });

  });

  console.log("Seed finished");
}

(() => {
  if ((process.env.NODE_ENV = "production")) return;

  main();
})();
