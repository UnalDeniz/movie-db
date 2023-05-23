import { Router } from 'express';
import login from '../controllers/user/login.js';

const router = Router();

// Auth
router.post('/login', login.loginHandler);

export default router