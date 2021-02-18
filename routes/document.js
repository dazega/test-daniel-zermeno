import express from "express";
import {
  createDocument,
  updateDocument,
  shareDocumentWith,
  getDocument,
  getDocuments,
  getDocumentHistory
} from "../controllers/document";
import { checkToken } from "../middleware/middleware";

const router = express.Router();

router.get('/', checkToken, getDocuments);
router.get('/:documentId', checkToken, getDocument);
router.get('/document-history/:documentId', checkToken, getDocumentHistory);
router.post('/create', checkToken, createDocument);
router.put('/:documentId', checkToken, updateDocument);
router.post('/share-document/:documentId', checkToken, shareDocumentWith);

export default router;
