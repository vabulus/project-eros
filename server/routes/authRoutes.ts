import express from 'express';
const router = express.Router();
import AuthController from "../controllers/authController";
import {auth} from "../middleware/auth.js";

router.get('/', auth, AuthController.all)
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);

router.get('/profile', auth);

export default router;