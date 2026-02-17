"use strict";

import { Router } from "express";
import {
  getComentaries,
  getComentarieById,
  createComentarie,
  updateComentarie,
  changeComentarieStatus,
} from "./comentarie.controller.js";

import {
  validateCreateComentarie,
  validateUpdateComentarie,
  validateComentarieStatusChange,
  validateGetComentarieById,
} from "../../middlewares/comentaries-validation.js";

const router = Router();

//GET
router.get("/:idPublication", getComentaries);
router.get("/find/:id", validateGetComentarieById, getComentarieById);

//POST
router.post("/", validateCreateComentarie, createComentarie);

//PUT
router.put("/:id", validateUpdateComentarie, updateComentarie);
router.put(
  "/:id/desactivate",
  validateComentarieStatusChange,
  changeComentarieStatus,
);
router.put(
  "/:id/activate",
  validateComentarieStatusChange,
  changeComentarieStatus,
);

export default router;
