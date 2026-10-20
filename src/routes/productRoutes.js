"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
const auth_1 = require("../middlewares/auth");
const upload_1 = require("../middlewares/upload");
const router = (0, express_1.Router)();
// Public: Get products
router.get('/', productController_1.getProducts);
router.get('/:id', productController_1.getProduct);
// Protected: Create product with images (Customer or Admin)
router.post('/', auth_1.authenticateToken, upload_1.upload.array('images', 10), productController_1.createProduct);
// Protected: Update product with images
router.put('/:id', auth_1.authenticateToken, upload_1.upload.array('images', 10), productController_1.updateProduct);
exports.default = router;
//# sourceMappingURL=productRoutes.js.map