import { Router } from 'express';
import login from '../controllers/user/login.js';

const router = Router();

// Auth
router.post('/login', login.loginHandler);
router.post('/db_login', login.db_loginHandler);

export default router