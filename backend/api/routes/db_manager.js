import { Router } from 'express';
import verify from '../../verify.js'
import { addPlatform, listRatings, avgRating, addManager, addDirector, updateDirector, listDirector, listMovies, addAudience, deleteAudience } from '../controllers/db_manager/index.js';

const router = Router();

//TODO add all api calls

router.post('/add_audience', verify.verifyManager, addAudience);
router.post('/add_director', verify.verifyManager, addDirector);
router.post('/add_manager', addManager);
router.post('/add_platform', verify.verifyManager, addPlatform);
router.post('/update_director', verify.verifyManager, updateDirector);
router.post('/delete_audience', verify.verifyManager, deleteAudience);
router.get('/list_director', verify.verifyManager, listDirector);
router.get('/list_movies', verify.verifyManager, listMovies);
router.get('/list_ratings', verify.verifyManager, listRatings);
router.get('/show_avg', verify.verifyManager, avgRating);

export default router
