import express from "express";
import multer from "multer";
import {
  RestaurantUpdateProfile,
  RestaurantGetData,
  RestaurantUpdateInfo,
  OpenRestaurant,
  RestaurantUpdateLegalInfo,
  RestaurantUpdateCoreDetails,
  RestaurantUpdateImages,
  RestaurantAddMenuItem,
  GetAllItems,
  UpdateMenuItem,
  DeleteMenuItem,
} from "../controllers/restaurant.controller.js";
import { RestaurantAuthProtect } from "../middlewares/auth.middleware.js";

const upload = multer();
const router = express.Router();

router.post(
  "/update-profile",
  RestaurantAuthProtect,
  upload.single("coverImage"),
  upload.array("restaurantImage", 10),
  RestaurantUpdateProfile,
);

router.get("/get-resturant-data", RestaurantAuthProtect, RestaurantGetData);

router.put(
  "/update-restaurant-info",
  RestaurantAuthProtect,
  RestaurantUpdateInfo,
);

router.put(
  "/update-core-details",
  RestaurantAuthProtect,
  RestaurantUpdateCoreDetails,
);

router.put(
  "/update-restaurant-images",
  RestaurantAuthProtect,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "restaurantImage", maxCount: 10 },
  ]),
  RestaurantUpdateImages,
);

// router.patch(
//   "/change-open-status/:openStatus",
//   RestaurantAuthProtect,
//   OpenRestaurant,
// );

router.patch(
  "/change-open-status/:openStatus",
  RestaurantAuthProtect,
  OpenRestaurant,
);

router.put(
  "/update-legal-info",
  RestaurantAuthProtect,
  RestaurantUpdateLegalInfo,
); 

//Menu Routes

router.post(
  "/add-menu-item",
  RestaurantAuthProtect,
  upload.single("itemImage"),
  RestaurantAddMenuItem,
);

router.put(
  "/update-menu-item/:menuItemId",
  RestaurantAuthProtect,
  upload.single("itemImage"),
  UpdateMenuItem,
);

router.delete(
  "/delete-menu-item/:menuItemId",
  RestaurantAuthProtect,
  DeleteMenuItem,
);

router.get("/allmenu", RestaurantAuthProtect, GetAllItems);

export default router;