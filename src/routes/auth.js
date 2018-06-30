import express from 'express';
import { requireLogin } from '../config/passport';

import signUp from '../controllers/auth/signup';
import signIn from '../controllers/auth/signIn';

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', requireLogin, signIn);

export default router;
