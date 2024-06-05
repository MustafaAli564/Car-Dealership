import express from 'express';
import { deleteUser, test, updateUser, getUser, getUserListings } from '../controllers/user.controller.js';
import { isAdmin, verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.get('/test', test);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/:id', getUser)
router.get('/listings/:id', verifyToken, getUserListings)
export default router;
