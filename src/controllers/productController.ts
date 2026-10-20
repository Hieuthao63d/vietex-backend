import { Request, Response } from 'express';
import { prisma } from '../db';
import { AuthRequest } from '../middlewares/auth';
import { ProductStatus } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/cloudinary';

export const createProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { 
      name, slug, shortDescription, content, 
      sku, brand, minPrice, maxPrice, 
      status, categoryId,
      origin, certifications, quality, packaging, shelfLife,
      lat, long, ward, city, zipCode, rating, reviewCount, qaSchema,
      translations
    } = req.body;

    const authorId = req.user?.id;
    if (!authorId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    // Lấy danh sách file ảnh đã upload (buffer từ memory storage)
    const files = req.files as Express.Multer.File[];
    const finalSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const folderName = `vietex-products/${finalSlug}`;
    
    const imagesData = [];
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const publicId = `${finalSlug}-${Date.now()}-${i + 1}`;
        const imageUrl = await uploadToCloudinary(file.buffer, folderName, publicId);
        
        imagesData.push({
          imageUrl,
          isFeatured: i === 0,
          sortOrder: i
        });
      }
    }

    let parsedTranslations = null;
    if (translations) {
      parsedTranslations = typeof translations === 'string' ? JSON.parse(translations) : translations;
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        shortDescription,
        content,
        sku,
        brand,
        minPrice: minPrice ? parseFloat(minPrice) : null,
        maxPrice: maxPrice ? parseFloat(maxPrice) : null,
        status: status === 'PUBLISHED' ? ProductStatus.PUBLISHED : ProductStatus.DRAFT,
        origin,
        certifications,
        quality,
        packaging,
        shelfLife,
        translations: parsedTranslations,
        authorId,
        categoryId,
        images: {
          create: imagesData
        },
        seo: {
          create: {
            lat: lat ? parseFloat(lat) : null,
            long: long ? parseFloat(long) : null,
            ward,
            city,
            zipCode,
            rating: rating ? parseFloat(rating) : null,
            reviewCount: reviewCount ? parseInt(reviewCount, 10) : 0,
            qaSchema: qaSchema ? JSON.parse(qaSchema) : null
          }
        }
      },
      include: {
        images: true,
        seo: true
      }
    });

    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await prisma.product.findMany({
      include: {
        images: { orderBy: { sortOrder: 'asc' } },
        seo: true,
        category: true,
        author: {
          select: { username: true, role: true }
        }
      }
    });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const product = await prisma.product.findFirst({
      where: {
        OR: [
          { id: id },
          { slug: id }
        ]
      },
      include: { 
        images: { orderBy: { sortOrder: 'asc' } }, 
        seo: true, 
        category: true 
      }
    });
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const { 
      name, slug, shortDescription, content, 
      sku, brand, minPrice, maxPrice, 
      status, categoryId,
      origin, certifications, quality, packaging, shelfLife,
      lat, long, ward, city, zipCode, rating, reviewCount, qaSchema,
      reorderedImageIds, deletedImageIds,
      translations
    } = req.body;

    const files = req.files as Express.Multer.File[];
    const newImagesCount = await prisma.productImage.count({ where: { productId: id } });
    
    // Process new images
    const imagesData = [];
    if (files && files.length > 0) {
      const finalSlug = slug || 'uncategorized';
      const folderName = `vietex-products/${finalSlug}`;
      // Lấy max sortOrder hiện tại để đếm tiếp
      let maxSortOrder = newImagesCount;
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // Đặt tên public_id theo số thứ tự tiếp theo
        const publicId = `${finalSlug}-${Date.now()}-${i + 1}`;
        const imageUrl = await uploadToCloudinary(file.buffer, folderName, publicId);
        
        imagesData.push({
          imageUrl,
          isFeatured: false,
          sortOrder: 1000 + i // Đặt ở cuối
        });
      }
    }

    const updateData: any = {
      name, slug, shortDescription, content, sku, brand,
      minPrice: minPrice ? parseFloat(minPrice) : null,
      maxPrice: maxPrice ? parseFloat(maxPrice) : null,
      status: status === 'PUBLISHED' ? ProductStatus.PUBLISHED : ProductStatus.DRAFT,
      origin, certifications, quality, packaging, shelfLife,
      categoryId
    };

    if (translations) {
      updateData.translations = typeof translations === 'string' ? JSON.parse(translations) : translations;
    }

    if (imagesData.length > 0) {
      updateData.images = { create: imagesData };
    }

    const seoData: any = {
      lat: lat ? parseFloat(lat) : null,
      long: long ? parseFloat(long) : null,
      ward, city, zipCode,
      rating: rating ? parseFloat(rating) : null,
      reviewCount: reviewCount ? parseInt(reviewCount, 10) : 0,
      qaSchema: qaSchema ? JSON.parse(qaSchema) : null
    };

    // First delete requested images
    if (deletedImageIds) {
      const idsToDelete = JSON.parse(deletedImageIds);
      if (idsToDelete.length > 0) {
        // Fetch the images to get their URLs so we can delete the physical files
        const imagesToDelete = await prisma.productImage.findMany({
          where: { id: { in: idsToDelete } }
        });
        
        for (const img of imagesToDelete) {
          if (img.imageUrl.includes('res.cloudinary.com')) {
            await deleteFromCloudinary(img.imageUrl);
          } else {
            // Local file fallback
            const physicalPath = path.join(process.cwd(), img.imageUrl);
            if (fs.existsSync(physicalPath)) {
              try {
                fs.unlinkSync(physicalPath);
              } catch (err) {
                console.error(`Failed to delete physical file: ${physicalPath}`, err);
              }
            }
          }
        }

        await prisma.productImage.deleteMany({
          where: { id: { in: idsToDelete } }
        });
      }
    }

    // Then reorder existing images if provided
    if (reorderedImageIds) {
      const ids = JSON.parse(reorderedImageIds);
      for (let i = 0; i < ids.length; i++) {
        await prisma.productImage.update({
          where: { id: ids[i] },
          data: { sortOrder: i }
        });
      }
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...updateData,
        seo: {
          upsert: {
            create: seoData,
            update: seoData
          }
        }
      },
      include: { 
        images: { orderBy: { sortOrder: 'asc' } }, 
        seo: true 
      }
    });

    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
