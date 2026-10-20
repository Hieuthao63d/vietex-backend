import { prisma } from '../src/db';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function main() {
  console.log('Fetching all images from Cloudinary...');
  const res = await cloudinary.api.resources({
    type: 'upload',
    prefix: 'vietex-products',
    max_results: 100
  });

  const resources = res.resources as Array<{ public_id: string; secure_url: string }>;
  console.log(`Found ${resources.length} Cloudinary images.`);

  // Group by product slug
  const productImagesMap = new Map<string, string[]>();

  for (const item of resources) {
    // public_id format: vietex-products/<slug>/<file>
    const parts = item.public_id.split('/');
    if (parts.length >= 3) {
      const slug = parts[1]!;
      if (!productImagesMap.has(slug)) {
        productImagesMap.set(slug, []);
      }
      productImagesMap.get(slug)!.push(item.secure_url);
    }
  }

  for (const [slug, urls] of productImagesMap.entries()) {
    // Sort urls by the suffix index (1, 2, 3, 4)
    urls.sort((a, b) => a.localeCompare(b));

    const product = await prisma.product.findUnique({
      where: { slug }
    });

    if (!product) {
      console.log(`Product with slug ${slug} not found in DB.`);
      continue;
    }

    console.log(`Updating images for product: ${slug} (${urls.length} images)`);

    // Remove old local image paths for this product
    await prisma.productImage.deleteMany({
      where: { productId: product.id }
    });

    // Create new records with Cloudinary secure_url
    await prisma.productImage.createMany({
      data: urls.map((url, index) => ({
        productId: product.id,
        imageUrl: url,
        isFeatured: index === 0,
        sortOrder: index
      }))
    });

    console.log(`✔ Updated ${slug} with Cloudinary URLs`);
  }

  console.log('\nAll Cloudinary images synced to Database successfully!');
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
