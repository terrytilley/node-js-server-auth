import express from 'express';
import { requireAuth } from '../config/passport';

import user from '../controllers/admin/user';
import roleAuthorization from '../controllers/auth/roleAuthorization';

const router = express.Router();

router.get('/user', requireAuth, roleAuthorization(['admin']), user);

export default router;
