import { Router } from 'express';
import { createProduct, getProducts, getProduct, updateProduct } from '../controllers/productController';
import { authenticateToken } from '../middlewares/auth';
import { upload } from '../middlewares/upload';

const router = Router();

// Public: Get products
router.get('/', getProducts);
router.get('/:id', getProduct);

// Protected: Create product with images (Customer or Admin)
router.post('/', authenticateToken, upload.array('images', 10), createProduct);

// Protected: Update product with images
router.put('/:id', authenticateToken, upload.array('images', 10), updateProduct);

export default router;
