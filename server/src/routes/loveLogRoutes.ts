import LoveLogController from "../controllers/lovelogController";
import express from "express";

let router = express.Router();

router.get("/template/:id", LoveLogController.getLoveLogTemplate);


router.get("/lovelog/:id", LoveLogController.getLoveLog);

router.get("/lovelog", LoveLogController.getAllLoveLogs);

router.post("/lovelog/", LoveLogController.createLoveLog);

router.delete("/delete-lovelog/:id", LoveLogController.deleteLoveLog);

router.put("/update-lovelog/:id", LoveLogController.updateLoveLog);

export default router;
