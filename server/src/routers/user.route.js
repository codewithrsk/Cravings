import express from "express";
import { updateUser } from "../controllers/user.controller.js";
import { AuthProtect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.put("/edit-profile",AuthProtect, updateUser);

export default router;
