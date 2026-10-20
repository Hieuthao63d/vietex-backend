import { v2 as cloudinary } from 'cloudinary';
export declare const uploadToCloudinary: (fileBuffer: Buffer, folder: string, publicId: string) => Promise<string>;
export declare const deleteFromCloudinary: (imageUrl: string) => Promise<void>;
export default cloudinary;
//# sourceMappingURL=cloudinary.d.ts.map