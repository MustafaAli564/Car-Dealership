import express from 'express';
import { deleteUser, test, updateUser } from '../controllers/user.controller.js';
import { isAdmin, verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.get('/test', test);
router.post('/update/:id', verifyToken,isAdmin, updateUser);
router.delete('/delete/:id', verifyToken, isAdmin, deleteUser);
export default router;
