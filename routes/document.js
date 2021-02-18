import express from "express";
import {
  createDocument,
  updateDocument,
  sharedDocument
} from "../controllers/document";
import { checkToken } from "../middleware/middleware";

const router = express.Router();

router.post('/create', checkToken, createDocument);
router.put('/:documentId', checkToken, updateDocument);
router.post('/sharedDocument/:documentId', checkToken, sharedDocument);

export default router;
