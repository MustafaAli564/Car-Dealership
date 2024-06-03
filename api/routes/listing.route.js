import express from 'express'; 
import * as controller from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, controller.createListing); 

router.put('/update/:id', verifyToken, controller.updateListing);

router.delete('/delete/:id', verifyToken, controller.deleteListing);

router.get('/get/:id', controller.getListing)

router.get('/user/:userId', controller.getUserListings);

router.get('/search', controller.searchListings);

export default router; 