import { prisma } from '../src/db';
import fs from 'fs';
import path from 'path';

const BACKEND_UPLOAD_DIR = path.resolve(__dirname, '../uploads');

async function main() {
  console.log('Reorganizing images in:', BACKEND_UPLOAD_DIR);

  // Lấy tất cả product kèm theo hình ảnh
  const products = await prisma.product.findMany({
    include: {
      images: {
        orderBy: { sortOrder: 'asc' }
      }
    }
  });

  let movedCount = 0;

  for (const product of products) {
    if (product.images.length === 0) continue;

    const slug = product.slug;
    const productDir = path.join(BACKEND_UPLOAD_DIR, slug);

    // Đảm bảo thư mục sản phẩm tồn tại
    if (!fs.existsSync(productDir)) {
      fs.mkdirSync(productDir, { recursive: true });
    }

    // Lặp qua từng ảnh của sản phẩm để đổi tên và di chuyển
    let index = 1;
    for (const img of product.images) {
      // imageUrl cũ có thể là /uploads/uuid-file.png hoặc /images/products/..
      const oldFileName = path.basename(img.imageUrl);
      
      // Tìm đường dẫn file vật lý hiện tại
      // 1. Kiểm tra xem nó có đang nằm trong thư mục gốc uploads không
      let currentPhysicalPath = path.join(BACKEND_UPLOAD_DIR, oldFileName);
      
      // 2. Nếu nó đang nằm ở một nơi khác (VD: đã ở trong thư mục slug)
      if (!fs.existsSync(currentPhysicalPath)) {
        // Thử tìm theo cấu trúc /uploads/slug/file.ext
        const possiblePath = path.join(BACKEND_UPLOAD_DIR, '..', img.imageUrl);
        if (fs.existsSync(possiblePath)) {
          currentPhysicalPath = possiblePath;
        } else {
           console.log(`⚠️ Không tìm thấy file vật lý cho ảnh: ${img.imageUrl}`);
           continue; // Bỏ qua nếu không thấy file thật
        }
      }

      const ext = path.extname(oldFileName);
      const newFileName = `${slug}-${index}${ext}`;
      const newPhysicalPath = path.join(productDir, newFileName);
      const newImageUrl = `/uploads/${slug}/${newFileName}`;

      // Chỉ move nếu đường dẫn vật lý thực sự thay đổi
      if (currentPhysicalPath !== newPhysicalPath) {
        // Tránh ghi đè nếu file mới vô tình trùng tên file cũ đang tồn tại (tạo file tạm)
        fs.renameSync(currentPhysicalPath, newPhysicalPath);
      }

      // Luôn cập nhật lại DB cho chắc chắn
      await prisma.productImage.update({
        where: { id: img.id },
        data: { 
          imageUrl: newImageUrl,
          sortOrder: index // Đánh lại số thứ tự luôn cho chuẩn
        }
      });

      index++;
      movedCount++;
    }
    
    console.log(`✅ Reorganized ${product.images.length} images for product: ${slug}`);
  }

  console.log(`\nHoàn tất! Đã sắp xếp và đổi tên ${movedCount} hình ảnh vào đúng thư mục.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
