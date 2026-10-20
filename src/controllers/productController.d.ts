import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
export declare const createProduct: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getProducts: (req: Request, res: Response) => Promise<void>;
export declare const getProduct: (req: Request, res: Response) => Promise<void>;
export declare const updateProduct: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=productController.d.ts.map