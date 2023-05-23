import { Router } from 'express';
import verify from '../../verify.js'
import { addDirector, addAudience, deleteAudience } from '../controllers/db_manager/index.js';

const router = Router();

//TODO add all api calls
//router.get('/path', function);

router.post('/add_director', addDirector);
router.post('/add_audience', addAudience);
router.delete('/delete_audience', deleteAudience);

export default router
