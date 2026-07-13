import express from "express";
import { ContactUsForm, AllRestaurants  } from "../controllers/public.controller.js";

const router = express.Router();

router.post("/contact-us", ContactUsForm);
router.get("/restaurants",AllRestaurants)

export default router;
