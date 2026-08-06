import express from "express";
import multer from "multer";
import { AuthProtect } from "../middlewares/auth.middleware.js";
import {
  getRiderProfile,
  toggleRiderAvailability,
  updateRiderProfile,
} from "../controllers/rider.controller.js";

const Upload = multer();
const router = express.Router();

router.get("/profile", AuthProtect, getRiderProfile);
router.put("/profile", AuthProtect, Upload.single("displayPic"), updateRiderProfile);
router.patch("/availability/:status", AuthProtect, toggleRiderAvailability);

export default router;
