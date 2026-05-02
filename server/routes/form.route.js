// routes/form.routes.js
import express from "express";
import {
  createForm,
  getForms,
  getFormById,
  deleteForm,
  updateFormById,
} from "../controller/form.controller.js";

const router = express.Router();

router.post("/", createForm);
router.get("/", getForms);
router.get("/:id", getFormById);
router.put("/:id", updateFormById);
router.delete("/:id", deleteForm);

export default router;
