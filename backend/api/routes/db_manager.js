import { Router } from 'express';
import { addDirector, addAudience } from '../controllers/db_manager/index.js';

const router = Router();

//TODO add all api calls
//router.get('/path', function);

router.post('/add_director', addDirector);
router.post('/add_audience', addAudience);

export default router
