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
    console.log('Creating empty folders for all products in:', BACKEND_UPLOAD_DIR);
    // Lấy tất cả product
    const products = await db_1.prisma.product.findMany();
    let createdCount = 0;
    for (const product of products) {
        const slug = product.slug;
        const productDir = path_1.default.join(BACKEND_UPLOAD_DIR, slug);
        // Nếu thư mục chưa tồn tại thì tạo mới
        if (!fs_1.default.existsSync(productDir)) {
            fs_1.default.mkdirSync(productDir, { recursive: true });
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
    await db_1.prisma.$disconnect();
});
//# sourceMappingURL=createFolders.js.map