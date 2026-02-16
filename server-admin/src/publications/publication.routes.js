"use strict";

import { Router } from "express";
import {
  getPublications,
  getPublicationById,
  createPublication,
  updatePublication,
  changePublicationStatus,
} from "./publication.controller.js";

import {
  validateCreatePublication,
  validateGetPublicationById,
  validateUpdatePublication,
  validatePublicationStatusChange,
} from "../../middlewares/publications-validation.js";

import { uploadUserImage } from "../../middlewares/file-uploader.js";

const router = Router();

// GET
router.get("/", getPublications);
router.get("/:id", validateGetPublicationById, getPublicationById);

// POST
router.post(
  "/",
  uploadUserImage.single("photo"),
  validateCreatePublication,
  createPublication,
);

// PUT
router.put(
  "/:id",
  uploadUserImage.single("photo"),
  validateUpdatePublication,
  updatePublication,
);
router.put(
  "/:id/activate",
  validatePublicationStatusChange,
  changePublicationStatus,
);
router.put(
  "/:id/desactivate",
  validatePublicationStatusChange,
  changePublicationStatus,
);

export default router;
