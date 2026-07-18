import express from "express";
import multer from "multer";
import {
  updateUser,
  UpdateUserPassword,
} from "../controllers/common.controller.js";
import { AuthProtect } from "../middlewares/auth.middleware.js";
import { GetAllUsers } from "../controllers/admin.controller.js";

const Upload = multer();
const router = express.Router();

router.put(
  "/edit-profile",
  AuthProtect,
  Upload.single("displayPic"),
  updateUser,
);

router.patch("/change-password", AuthProtect, UpdateUserPassword);

export default router;
