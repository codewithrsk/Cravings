import express from "express";
import multer from "multer";
import { MenuUpdateInfo } from "../controllers/menu.controller.js";
import { RestaurantAuthProtect } from "../middlewares/auth.middleware.js";

const router = express.Router();
const upload = multer();

router.put("/update-menu-info", RestaurantAuthProtect,upload.single("coverImage") ,MenuUpdateInfo);

export default router;
