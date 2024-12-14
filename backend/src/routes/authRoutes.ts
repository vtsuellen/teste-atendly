import express from 'express';
import { register, login, profile } from '../controllers/ authController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', (req, res) => {
  register(req, res);
});
router.post('/login', (req, res) => {
  login(req, res);
});
router.get('/profile', authMiddleware, (req, res) => {
  profile(req, res);
});

export default router;
