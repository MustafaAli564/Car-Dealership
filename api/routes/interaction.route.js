import * as controller from '../controllers/interaction.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import express from 'express';

const router = express.Router();

router.post('/fav', verifyToken, controller.favListing);
router.post('/unfav', verifyToken, controller.unfavouriteListing);
router.post('/report', verifyToken, controller.reportListing);
//router.post('/contact', verifyToken, controller.contactSeller);

export default router; 