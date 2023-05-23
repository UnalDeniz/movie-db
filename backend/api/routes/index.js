import { Router } from 'express';
import dbManager from './db_manager.js';
// import director from './director.js';
// import audience from './audience.js';

const router = Router();

router.use('/manager', dbManager);
// router.use('/director', director);
// router.use('/audience', audience);

export default router;

