"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../src/db");
const cloudinary_1 = require("../src/utils/cloudinary");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
async function main() {
    console.log('Bắt đầu chuyển toàn bộ ảnh từ Local sang Cloudinary...');
    // Lấy tất cả các ảnh có URL bắt đầu bằng /uploads/
    const localImages = await db_1.prisma.productImage.findMany({
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
        const physicalPath = path_1.default.join(process.cwd(), img.imageUrl);
        if (!fs_1.default.existsSync(physicalPath)) {
            console.log(`⚠️ Không tìm thấy file vật lý: ${physicalPath}`);
            failedCount++;
            continue;
        }
        try {
            // Đọc file thành buffer
            const fileBuffer = fs_1.default.readFileSync(physicalPath);
            const slug = img.product.slug || 'uncategorized';
            const folderName = `vietex-products/${slug}`;
            // Lấy tên file cũ (ví dụ: canned-mango-1) bỏ đuôi
            let publicId = path_1.default.basename(img.imageUrl);
            const extIndex = publicId.lastIndexOf('.');
            if (extIndex !== -1) {
                publicId = publicId.substring(0, extIndex);
            }
            console.log(`⏳ Đang upload: ${publicId}...`);
            // Upload lên cloudinary
            const cloudinaryUrl = await (0, cloudinary_1.uploadToCloudinary)(fileBuffer, folderName, publicId);
            // Cập nhật Database
            await db_1.prisma.productImage.update({
                where: { id: img.id },
                data: { imageUrl: cloudinaryUrl }
            });
            // Xóa file local sau khi upload thành công (tùy chọn)
            fs_1.default.unlinkSync(physicalPath);
            console.log(`✅ Upload thành công: ${cloudinaryUrl}`);
            successCount++;
        }
        catch (err) {
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
    await db_1.prisma.$disconnect();
});
//# sourceMappingURL=migrateToCloudinary.js.map