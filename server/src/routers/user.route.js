import express from "express";
import multer from "multer";
import { updateUser } from "../controllers/user.controller.js";
import { AuthProtect } from "../middlewares/auth.middleware.js";

const router = express.Router();
const Upload = multer();

router.put(
  "/edit-profile",
  AuthProtect,
  Upload.single("displayPic"),
  updateUser,
);

export default router;
