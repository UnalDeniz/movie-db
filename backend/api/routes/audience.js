import { Router } from 'express';
import verify from '../../verify.js'
import { listMovie } from '../controllers/audience/index.js';

const router = Router();

//TODO add all api calls

router.get('/list_movie', verify.verifyAudience, listMovie);

export default router
