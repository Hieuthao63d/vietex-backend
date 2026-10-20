import { prisma } from '../src/db';
import fs from 'fs';
import path from 'path';

const FRONTEND_DIR = path.resolve(__dirname, '../../vietex-frontend/public');
const BACKEND_UPLOAD_DIR = path.resolve(__dirname, '../uploads');

async function main() {
  console.log('Frontend public dir:', FRONTEND_DIR);
  console.log('Backend upload dir:', BACKEND_UPLOAD_DIR);

  // Đảm bảo thư mục uploads tồn tại
  if (!fs.existsSync(BACKEND_UPLOAD_DIR)) {
    fs.mkdirSync(BACKEND_UPLOAD_DIR, { recursive: true });
  }

  const images = await prisma.productImage.findMany({
    where: {
      imageUrl: {
        startsWith: '/images/products/'
      }
    }
  });

  console.log(`Found ${images.length} images needing migration.`);

  let successCount = 0;
  let missingCount = 0;

  for (const img of images) {
    // imageUrl là dạng: /images/products/canned-pineapple/canned-pineapple-1.png
    const sourcePath = path.join(FRONTEND_DIR, img.imageUrl);
    
    // Nếu file tồn tại ở frontend, copy sang backend
    if (fs.existsSync(sourcePath)) {
      const fileName = path.basename(sourcePath);
      // Tạo tên file an toàn ở backend để không trùng lặp
      const newFileName = `${img.id}-${fileName}`;
      const destPath = path.join(BACKEND_UPLOAD_DIR, newFileName);

      // Copy file
      fs.copyFileSync(sourcePath, destPath);

      // Cập nhật Database
      await prisma.productImage.update({
        where: { id: img.id },
        data: { imageUrl: `/uploads/${newFileName}` }
      });

      console.log(`✅ Migrated: ${fileName}`);
      successCount++;
    } else {
      // File không tồn tại (chữ hardcode bị dư trong data cũ) -> xóa khỏi DB để không bị lỗi vỡ ảnh
      await prisma.productImage.delete({
        where: { id: img.id }
      });
      console.log(`❌ Missing (Deleted from DB): ${img.imageUrl}`);
      missingCount++;
    }
  }

  console.log(`\nMigration completed!`);
  console.log(`Successfully migrated: ${successCount} images.`);
  console.log(`Deleted missing records: ${missingCount} records.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
