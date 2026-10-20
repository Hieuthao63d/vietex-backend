import { prisma } from '../src/db';
import fs from 'fs';
import path from 'path';

const BACKEND_UPLOAD_DIR = path.resolve(__dirname, '../uploads');

async function main() {
  console.log('Sweeping for orphaned images in:', BACKEND_UPLOAD_DIR);

  // 1. Get all image URLs from DB
  const dbImages = await prisma.productImage.findMany({
    select: { imageUrl: true }
  });
  
  // Create a Set of physical paths that are known to the DB
  const validPaths = new Set(dbImages.map(img => path.normalize(path.join(process.cwd(), img.imageUrl))));

  // 2. Recursively find all files in the uploads directory
  function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
    const files = fs.readdirSync(dirPath);

    files.forEach(function(file) {
      if (fs.statSync(dirPath + "/" + file).isDirectory()) {
        arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
      } else {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    });

    return arrayOfFiles;
  }

  const allPhysicalFiles = getAllFiles(BACKEND_UPLOAD_DIR);
  let deletedCount = 0;

  for (const file of allPhysicalFiles) {
    const normalizedFile = path.normalize(file);
    if (!validPaths.has(normalizedFile)) {
      console.log(`🗑️ Deleting orphaned file: ${normalizedFile}`);
      fs.unlinkSync(normalizedFile);
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
    await prisma.$disconnect();
  });
