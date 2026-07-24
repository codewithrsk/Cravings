import express from "express";
import { MenuUpdateInfo } from "../controllers/menu.controller";
const router = express.Router();

router.put("/update-menu-info",MenuUpdateInfo)

export default router;
