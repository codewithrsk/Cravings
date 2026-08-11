import express from "express";
import { AuthProtect } from "../middlewares/auth.middleware.js";
import {
  CreateRazorpayOrder,
  VerifyRazorpayPayment,
} from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/create-order", AuthProtect, CreateRazorpayOrder);
router.post("/verify", AuthProtect, VerifyRazorpayPayment);

export default router;