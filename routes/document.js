import express from "express";
import { createDocument } from "../controllers/document";
import { checkToken } from "../middleware/middleware";

const router = express.Router();

router.post('/create', checkToken, createDocument);

export default router;
