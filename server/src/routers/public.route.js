import express from "express";
import {
  ContactUsForm,
  AllRestaurants,
  GetRestaurantDetails,
} from "../controllers/public.controller.js";

const router = express.Router();

router.post("/contact-us", ContactUsForm);
router.get("/restaurants", AllRestaurants);
router.get("/restaurant-detail/:restaurantId", GetRestaurantDetails);

export default router;
