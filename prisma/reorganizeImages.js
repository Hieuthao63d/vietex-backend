"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../src/db");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const BACKEND_UPLOAD_DIR = path_1.default.resolve(__dirname, '../uploads');
async function main() {
    console.log('Reorganizing images in:', BACKEND_UPLOAD_DIR);
    // Lấy tất cả product kèm theo hình ảnh
    const products = await db_1.prisma.product.findMany({
        include: {
            images: {
                orderBy: { sortOrder: 'asc' }
            }
        }
    });
    let movedCount = 0;
    for (const product of products) {
        if (product.images.length === 0)
            continue;
        const slug = product.slug;
        const productDir = path_1.default.join(BACKEND_UPLOAD_DIR, slug);
        // Đảm bảo thư mục sản phẩm tồn tại
        if (!fs_1.default.existsSync(productDir)) {
            fs_1.default.mkdirSync(productDir, { recursive: true });
        }
        // Lặp qua từng ảnh của sản phẩm để đổi tên và di chuyển
        let index = 1;
        for (const img of product.images) {
            // imageUrl cũ có thể là /uploads/uuid-file.png hoặc /images/products/..
            const oldFileName = path_1.default.basename(img.imageUrl);
            // Tìm đường dẫn file vật lý hiện tại
            // 1. Kiểm tra xem nó có đang nằm trong thư mục gốc uploads không
            let currentPhysicalPath = path_1.default.join(BACKEND_UPLOAD_DIR, oldFileName);
            // 2. Nếu nó đang nằm ở một nơi khác (VD: đã ở trong thư mục slug)
            if (!fs_1.default.existsSync(currentPhysicalPath)) {
                // Thử tìm theo cấu trúc /uploads/slug/file.ext
                const possiblePath = path_1.default.join(BACKEND_UPLOAD_DIR, '..', img.imageUrl);
                if (fs_1.default.existsSync(possiblePath)) {
                    currentPhysicalPath = possiblePath;
                }
                else {
                    console.log(`⚠️ Không tìm thấy file vật lý cho ảnh: ${img.imageUrl}`);
                    continue; // Bỏ qua nếu không thấy file thật
                }
            }
            const ext = path_1.default.extname(oldFileName);
            const newFileName = `${slug}-${index}${ext}`;
            const newPhysicalPath = path_1.default.join(productDir, newFileName);
            const newImageUrl = `/uploads/${slug}/${newFileName}`;
            // Chỉ move nếu đường dẫn vật lý thực sự thay đổi
            if (currentPhysicalPath !== newPhysicalPath) {
                // Tránh ghi đè nếu file mới vô tình trùng tên file cũ đang tồn tại (tạo file tạm)
                fs_1.default.renameSync(currentPhysicalPath, newPhysicalPath);
            }
            // Luôn cập nhật lại DB cho chắc chắn
            await db_1.prisma.productImage.update({
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
    await db_1.prisma.$disconnect();
});
//# sourceMappingURL=reorganizeImages.js.map