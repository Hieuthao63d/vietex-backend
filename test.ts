import { prisma } from './src/db';

async function main() {
  const p = await prisma.product.findMany({
    include: { images: { orderBy: { sortOrder: 'asc' } } }
  });
  console.log(JSON.stringify(p.map(x => ({ name: x.name, images: x.images })), null, 2));
  console.log(JSON.stringify(p?.images, null, 2));
}

main();
