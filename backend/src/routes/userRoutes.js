import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { loginUser, markAttendance, registerUser, testApi, userData , } from '../controllers/userController.js';
import { attands, getEmps } from '../controllers/attandance.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/markAttendance', markAttendance);
router.get('/test',verifyToken, testApi);

// attandance Api
router.get('/get_emps', getEmps);
router.get('/get_attandance/:userId', attands);

router.get('/varify', verifyToken, userData)



export default router;
