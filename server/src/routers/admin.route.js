import express from "express";
import { GetAllUsers } from "../controllers/admin.controller.js";
const router = express.Router();
console.log("admin router hit");


router.get("/users", GetAllUsers);


export default router;
