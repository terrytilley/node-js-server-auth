import express from 'express';
import { requireLogin } from '../config/passport';

import signUp from '../controllers/auth/signup';
import signIn from '../controllers/auth/signIn';
import resetPassword from '../controllers/auth/resetPassword';
import forgotPassword from '../controllers/auth/forgotPassword';

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', requireLogin, signIn);
router.post('/reset-password', resetPassword);
router.post('/forgot-password', forgotPassword);

export default router;
