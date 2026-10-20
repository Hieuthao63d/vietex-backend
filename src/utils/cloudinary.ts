import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadToCloudinary = (fileBuffer: Buffer, folder: string, publicId: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: publicId,
        overwrite: true,
        transformation: [
          { width: 800, height: 800, crop: "fill" }
        ]
      },
      (error, result) => {
        if (error) return reject(error);
        if (result) resolve(result.secure_url);
      }
    );
    uploadStream.end(fileBuffer);
  });
};

export const deleteFromCloudinary = async (imageUrl: string) => {
  try {
    // imageUrl is like https://res.cloudinary.com/cloud_name/image/upload/v1234/folder/public_id.ext
    // We need to extract folder/public_id
    const parts = imageUrl.split('/');
    const folderIndex = parts.findIndex(p => p === 'upload') + 2; // +1 is version, +2 is folder
    if (folderIndex >= 2 && folderIndex < parts.length) {
      let publicIdWithFolder = parts.slice(folderIndex).join('/');
      // remove extension
      const lastDotIndex = publicIdWithFolder.lastIndexOf('.');
      if (lastDotIndex !== -1) {
        publicIdWithFolder = publicIdWithFolder.substring(0, lastDotIndex);
      }
      await cloudinary.uploader.destroy(publicIdWithFolder);
    }
  } catch (error) {
    console.error('Failed to delete from Cloudinary:', error);
  }
};

export default cloudinary;
