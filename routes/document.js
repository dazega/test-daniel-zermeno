import express from "express";
import {
  createDocument,
  updateDocument,
  shareDocumentWith,
  getDocument,
  getDocuments
} from "../controllers/document";
import { checkToken } from "../middleware/middleware";

const router = express.Router();

router.get('/', checkToken, getDocuments);
router.get('/:documentId', checkToken, getDocument);
router.post('/create', checkToken, createDocument);
router.put('/:documentId', checkToken, updateDocument);
router.post('/sharedDocument/:documentId', checkToken, shareDocumentWith);

export default router;
