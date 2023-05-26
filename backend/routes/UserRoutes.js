import express from 'express';
import { registerGuestUser, loginUser, registerUser, logoutUser, getUserProfile, updateUserProfile } from '../controllers/UserControllers.js';

const router = express.Router();

router.get('/makeguestuser', registerGuestUser);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.route('/profile').get(getUserProfile).put(updateUserProfile);

export default router;