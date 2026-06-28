import express from "express";
import {
  LoginUser,
  Logout,
  RegisterUser,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", LoginUser);
router.post("/register", RegisterUser);
router.get("/logout", Logout);

export default router;