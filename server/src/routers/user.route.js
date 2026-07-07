import express from "express";
import multer from "multer";
import { updateUser } from "../controllers/user.controller.js";
import { AuthProtect } from "../middlewares/auth.middleware.js";

const Upload = multer();
const router = express.Router();

router.put(
  "/edit-profile",
  AuthProtect,
  Upload.single("displayPic"),
  updateUser,
);

export default router;