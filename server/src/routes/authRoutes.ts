import express from "express";

import AuthController from "../controllers/authController";
import LoveLogController from "../controllers/lovelogController";
import { auth } from "../middleware/auth";

const router = express.Router();

router.get("/", AuthController.all);
router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.get("/profile", AuthController.profile);
router.post("/profile", AuthController.profile);
router.post("/logout", AuthController.logout);

router.get("/get-template", LoveLogController.getLoveLogTemplate);
router.get("/new-lovelog", LoveLogController.createLoveLog);
router.get("/get-lovelog", LoveLogController.getLoveLog);

export default router;
