import { Router } from 'express';
import verify from '../../verify.js'
import { addDirector } from '../controllers/db_manager/index.js';

const router = Router();

//TODO add all api calls
//router.get('/path', function);

router.post('/add_director' ,addDirector);

export default router
