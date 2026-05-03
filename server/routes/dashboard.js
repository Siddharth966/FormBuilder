import express from "express";
import{ getDashboardItems } from "../controller/dashboard.js";

const router = express.Router();

router.get("/", getDashboardItems);

export default router