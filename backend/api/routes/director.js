import { Router } from 'express';
import verify from '../../verify.js'
import { addGenre, addMovie } from '../controllers/director/index.js';

const router = Router();

//TODO add all api calls
//router.get('/path', function);

router.post('/add_genre', verify.verifyDirector, addGenre);
router.post('/add_movie', verify.verifyDirector, addMovie);

export default router
