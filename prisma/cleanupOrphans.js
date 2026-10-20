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
    console.log('Sweeping for orphaned images in:', BACKEND_UPLOAD_DIR);
    // 1. Get all image URLs from DB
    const dbImages = await db_1.prisma.productImage.findMany({
        select: { imageUrl: true }
    });
    // Create a Set of physical paths that are known to the DB
    const validPaths = new Set(dbImages.map(img => path_1.default.normalize(path_1.default.join(process.cwd(), img.imageUrl))));
    // 2. Recursively find all files in the uploads directory
    function getAllFiles(dirPath, arrayOfFiles = []) {
        const files = fs_1.default.readdirSync(dirPath);
        files.forEach(function (file) {
            if (fs_1.default.statSync(dirPath + "/" + file).isDirectory()) {
                arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
            }
            else {
                arrayOfFiles.push(path_1.default.join(dirPath, "/", file));
            }
        });
        return arrayOfFiles;
    }
    const allPhysicalFiles = getAllFiles(BACKEND_UPLOAD_DIR);
    let deletedCount = 0;
    for (const file of allPhysicalFiles) {
        const normalizedFile = path_1.default.normalize(file);
        if (!validPaths.has(normalizedFile)) {
            console.log(`🗑️ Deleting orphaned file: ${normalizedFile}`);
            fs_1.default.unlinkSync(normalizedFile);
            deletedCount++;
        }
    }
    console.log(`\nHoàn tất! Đã dọn dẹp ${deletedCount} file mồ côi (file có trong thư mục nhưng không có trong DB).`);
}
main()
    .catch(e => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await db_1.prisma.$disconnect();
});
//# sourceMappingURL=cleanupOrphans.js.map