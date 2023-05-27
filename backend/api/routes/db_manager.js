import { Router } from 'express';
import verify from '../../verify.js'
import { addManager, addDirector, updateDirector, listDirector, addAudience, deleteAudience } from '../controllers/db_manager/index.js';

const router = Router();

//TODO add all api calls
//router.get('/path', function);

router.post('/add_director', verify.verifyManager, addDirector);
router.post('/add_audience', verify.verifyManager, addAudience);
router.post('/add_manager', verify.verifyManager, addManager);
router.delete('/delete_audience', verify.verifyManager, deleteAudience);
router.put('/update_director', verify.verifyManager, updateDirector);
router.get('/list_director', verify.verifyManager, listDirector);

export default router
