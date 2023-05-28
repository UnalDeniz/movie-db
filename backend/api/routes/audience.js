import { Router } from 'express';
import verify from '../../verify.js'
import { buyTicket, listMovie, listTicket } from '../controllers/audience/index.js';

const router = Router();

//TODO add all api calls

router.get('/list_movie', verify.verifyAudience, listMovie);
router.get('/list_ticket', verify.verifyAudience, listTicket);
router.post('/buy_ticket', verify.verifyAudience, buyTicket);

export default router
