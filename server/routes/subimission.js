import express from "express";
import {
  createResponse,
  getResponsesByForm,
  getResponseById,
  deleteResponse,
} from "../controllers/response.controller.js";

const router = express.Router();

router.post("/", createResponse); // POST   /api/responses
router.get("/form/:formId", getResponsesByForm); // GET    /api/responses/form/:formId
router.get("/:id", getResponseById); // GET    /api/responses/:id
router.delete("/:id", deleteResponse); // DELETE /api/responses/:id

export default router;
