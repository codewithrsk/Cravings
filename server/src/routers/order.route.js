import express from "express";
import { AuthProtect } from "../middlewares/auth.middleware.js";
import { CreateOrder } from "../controllerS/order.controller.js";

const router = express.Router();

router.post("/create", AuthProtect, CreateOrder);

export default router;