import express from 'express';
import authRoutes from './auth';
import adminRoutes from './admin';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Node JS API v1.0' });
});

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);

export default router;
