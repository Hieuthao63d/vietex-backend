import { Router } from 'express';
import { login } from '../controllers/authController';
import { authenticateToken, authorizeAdmin } from '../middlewares/auth';

const router = Router();

// Public routes
router.post('/login', login);

export default router;
