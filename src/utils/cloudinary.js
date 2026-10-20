"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFromCloudinary = exports.uploadToCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const uploadToCloudinary = (fileBuffer, folder, publicId) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary_1.v2.uploader.upload_stream({
            folder,
            public_id: publicId,
            overwrite: true,
            transformation: [
                { width: 800, height: 800, crop: "fill" }
            ]
        }, (error, result) => {
            if (error)
                return reject(error);
            if (result)
                resolve(result.secure_url);
        });
        uploadStream.end(fileBuffer);
    });
};
exports.uploadToCloudinary = uploadToCloudinary;
const deleteFromCloudinary = async (imageUrl) => {
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
            await cloudinary_1.v2.uploader.destroy(publicIdWithFolder);
        }
    }
    catch (error) {
        console.error('Failed to delete from Cloudinary:', error);
    }
};
exports.deleteFromCloudinary = deleteFromCloudinary;
exports.default = cloudinary_1.v2;
//# sourceMappingURL=cloudinary.js.map