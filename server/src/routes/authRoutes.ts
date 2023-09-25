import express from "express";

import AuthController from "../controllers/authController";
import { auth } from "../middleware/auth";

const router = express.Router();

router.get("/", auth, AuthController.all);
router.post("/login", AuthController.login);
router.post("/register", AuthController.register);

router.get("/profile", auth);

export default router;
