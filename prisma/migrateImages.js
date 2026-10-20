"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../src/db");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const FRONTEND_DIR = path_1.default.resolve(__dirname, '../../vietex-frontend/public');
const BACKEND_UPLOAD_DIR = path_1.default.resolve(__dirname, '../uploads');
async function main() {
    console.log('Frontend public dir:', FRONTEND_DIR);
    console.log('Backend upload dir:', BACKEND_UPLOAD_DIR);
    // Đảm bảo thư mục uploads tồn tại
    if (!fs_1.default.existsSync(BACKEND_UPLOAD_DIR)) {
        fs_1.default.mkdirSync(BACKEND_UPLOAD_DIR, { recursive: true });
    }
    const images = await db_1.prisma.productImage.findMany({
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
        const sourcePath = path_1.default.join(FRONTEND_DIR, img.imageUrl);
        // Nếu file tồn tại ở frontend, copy sang backend
        if (fs_1.default.existsSync(sourcePath)) {
            const fileName = path_1.default.basename(sourcePath);
            // Tạo tên file an toàn ở backend để không trùng lặp
            const newFileName = `${img.id}-${fileName}`;
            const destPath = path_1.default.join(BACKEND_UPLOAD_DIR, newFileName);
            // Copy file
            fs_1.default.copyFileSync(sourcePath, destPath);
            // Cập nhật Database
            await db_1.prisma.productImage.update({
                where: { id: img.id },
                data: { imageUrl: `/uploads/${newFileName}` }
            });
            console.log(`✅ Migrated: ${fileName}`);
            successCount++;
        }
        else {
            // File không tồn tại (chữ hardcode bị dư trong data cũ) -> xóa khỏi DB để không bị lỗi vỡ ảnh
            await db_1.prisma.productImage.delete({
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
    await db_1.prisma.$disconnect();
});
//# sourceMappingURL=migrateImages.js.map