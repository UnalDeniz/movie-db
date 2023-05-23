import { Router } from 'express';
import verify from '../../verify.js'
import { addDirector, addAudience, deleteAudience } from '../controllers/db_manager/index.js';

const router = Router();

//TODO add all api calls
//router.get('/path', function);

router.post('/add_director', verify.verifyManager, addDirector);
router.post('/add_audience',verify.verifyManager, addAudience);
router.delete('/delete_audience',verify.verifyManager, deleteAudience);

export default router
