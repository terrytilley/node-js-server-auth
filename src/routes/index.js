import express from 'express';
import authRoutes from './auth';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Node JS API v1.0' });
});

router.use('/auth', authRoutes);

export default router;
