import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Phục vụ file tĩnh (ảnh) trong folder uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Vietex API is running!');
});

// 404 Not Found Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: `API route not found: ${req.method} ${req.url}` });
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: express.NextFunction) => {
  console.error('Express Error:', err);
  if (err.name === 'MulterError') {
    res.status(400).json({ message: `File upload error: ${err.message}` });
  } else {
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
