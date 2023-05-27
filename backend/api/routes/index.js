import { Router } from 'express';
import dbManager from './db_manager.js';
import director from './director.js';
// import audience from './audience.js';
import login from './login.js'

const router = Router();

router.use('/manager', dbManager);
router.use('/director', director);
// router.use('/audience', audience);
router.use('/user', login);

export default router;

