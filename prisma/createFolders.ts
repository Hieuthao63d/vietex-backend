import { prisma } from '../src/db';
import fs from 'fs';
import path from 'path';

const BACKEND_UPLOAD_DIR = path.resolve(__dirname, '../uploads');

async function main() {
  console.log('Creating empty folders for all products in:', BACKEND_UPLOAD_DIR);

  // Lấy tất cả product
  const products = await prisma.product.findMany();

  let createdCount = 0;

  for (const product of products) {
    const slug = product.slug;
    const productDir = path.join(BACKEND_UPLOAD_DIR, slug);

    // Nếu thư mục chưa tồn tại thì tạo mới
    if (!fs.existsSync(productDir)) {
      fs.mkdirSync(productDir, { recursive: true });
      console.log(`📁 Created folder: ${slug}`);
      createdCount++;
    }
  }

  console.log(`\nHoàn tất! Đã tạo sẵn ${createdCount} thư mục (chưa tồn tại) cho các sản phẩm.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
