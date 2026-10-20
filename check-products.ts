import { prisma } from './src/db';

async function main() {
  const products = await prisma.product.findMany({
    select: { id: true, name: true, slug: true, origin: true, quality: true, packaging: true }
  });
  console.log("PRODUCTS COUNT:", products.length);
  console.log(JSON.stringify(products, null, 2));
}

main();
