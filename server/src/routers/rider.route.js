import express from "express";
import multer from "multer";
import { AuthProtect } from "../middlewares/auth.middleware.js";
import { updateRiderProfile } from "../controllers/rider.controller.js";

const Upload = multer();
const router = express.Router();

router.put("/profile", AuthProtect, Upload.single("displayPic"), updateRiderProfile);

export default router;
