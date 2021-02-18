import express from "express";
import { createDocument, updateDocument } from "../controllers/document";
import { checkToken } from "../middleware/middleware";

const router = express.Router();

router.post('/create', checkToken, createDocument);
router.put('/:documentId', checkToken, updateDocument);

export default router;
