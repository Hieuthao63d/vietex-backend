import { prisma } from '../src/db';
import { uploadToCloudinary } from '../src/utils/cloudinary';
import fs from 'fs';
import path from 'path';

async function main() {
  console.log('Bắt đầu chuyển toàn bộ ảnh từ Local sang Cloudinary...');

  // Lấy tất cả các ảnh có URL bắt đầu bằng /uploads/
  const localImages = await prisma.productImage.findMany({
    where: {
      imageUrl: {
        startsWith: '/uploads/'
      }
    },
    include: {
      product: true
    }
  });

  console.log(`Tìm thấy ${localImages.length} ảnh cần chuyển lên Cloudinary.`);

  let successCount = 0;
  let failedCount = 0;

  for (const img of localImages) {
    const physicalPath = path.join(process.cwd(), img.imageUrl);
    
    if (!fs.existsSync(physicalPath)) {
      console.log(`⚠️ Không tìm thấy file vật lý: ${physicalPath}`);
      failedCount++;
      continue;
    }

    try {
      // Đọc file thành buffer
      const fileBuffer = fs.readFileSync(physicalPath);
      
      const slug = img.product.slug || 'uncategorized';
      const folderName = `vietex-products/${slug}`;
      
      // Lấy tên file cũ (ví dụ: canned-mango-1) bỏ đuôi
      let publicId = path.basename(img.imageUrl);
      const extIndex = publicId.lastIndexOf('.');
      if (extIndex !== -1) {
        publicId = publicId.substring(0, extIndex);
      }

      console.log(`⏳ Đang upload: ${publicId}...`);
      
      // Upload lên cloudinary
      const cloudinaryUrl = await uploadToCloudinary(fileBuffer, folderName, publicId);

      // Cập nhật Database
      await prisma.productImage.update({
        where: { id: img.id },
        data: { imageUrl: cloudinaryUrl }
      });

      // Xóa file local sau khi upload thành công (tùy chọn)
      fs.unlinkSync(physicalPath);

      console.log(`✅ Upload thành công: ${cloudinaryUrl}`);
      successCount++;
    } catch (err) {
      console.error(`❌ Lỗi khi upload ${img.imageUrl}:`, err);
      failedCount++;
    }
  }

  console.log(`\nHoàn tất quá trình Migrate Cloudinary!`);
  console.log(`Thành công: ${successCount}`);
  console.log(`Thất bại: ${failedCount}`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
