import { Router } from 'express';
import verify from '../../verify.js'
import { addGenre, addMovie, addTheatre, addSlot, addSession } from '../controllers/director/index.js';

const router = Router();

//TODO add all api calls
//router.get('/path', function);

router.post('/add_genre', verify.verifyDirector, addGenre);
router.post('/add_movie', verify.verifyDirector, addMovie);
router.post('/add_theatre', verify.verifyDirector, addTheatre);
router.post('/add_slot', verify.verifyDirector, addSlot);
router.post('/add_session', verify.verifyDirector, addSession);

export default router
