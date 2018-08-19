import express from 'express';
import { requireAuth, requireLogin } from '../config/passport';

import user from '../controllers/auth/user';
import login from '../controllers/auth/login';
import register from '../controllers/auth/register';
import resetPassword from '../controllers/auth/resetPassword';
import forgotPassword from '../controllers/auth/forgotPassword';

const router = express.Router();

router.post('/register', register);
router.post('/login', requireLogin, login);
router.post('/reset-password', resetPassword);
router.post('/forgot-password', forgotPassword);
router.get('/user', requireAuth, user);

export default router;
