import express from "express";
import { ContactUs } from "../controllers/public.controller.js";

const router = express.Router();

router.post("/contact-us", ContactUs);

export default router;
