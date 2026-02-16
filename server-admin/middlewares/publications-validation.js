"use strict";

import { body, param } from "express-validator";
import { checkValidators } from "./check-validators.js";
import mongoose from "mongoose";

export const validateCreatePublication = [
  body("userId")
    .notEmpty()
    .withMessage("El ID del usuario es obligatorio")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Debe ser un ID de MongoDB válido"),
  body("title")
    .trim()
    .notEmpty()
    .withMessage("El título es obligatorio")
    .isLength({ min: 3, max: 150 })
    .withMessage("El título debe tener entre 3 y 150 caracteres"),
  body("category")
    .trim()
    .notEmpty()
    .withMessage("La categoría es obligatoria")
    .isLength({ max: 50 })
    .withMessage("La categoría no puede exceder 50 caracteres"),
  body("content").trim().notEmpty().withMessage("El contenido es obligatorio"),
  checkValidators,
];

export const validateGetPublicationById = [
  param("id")
    .notEmpty()
    .withMessage("El ID es obligatorio")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Debe ser un ID de MongoDB válido"),
  checkValidators,
];

export const validateUpdatePublication = [
  param("id")
    .notEmpty()
    .withMessage("El ID es obligatorio")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Debe ser un ID de MongoDB válido"),
  body("title")
    .optional()
    .isLength({ min: 3, max: 150 })
    .withMessage("El título debe tener entre 3 y 150 caracteres"),
  body("category")
    .optional()
    .isLength({ max: 50 })
    .withMessage("La categoría no puede exceder 50 caracteres"),
  body("content")
  .optional()
  .trim(),
  body("userId")
    .optional()
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Debe ser un ID de MongoDB válido"),
  checkValidators,
];

export const validatePublicationStatusChange = [
  param("id")
    .notEmpty()
    .withMessage("El ID es obligatorio")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Debe ser un ID de MongoDB válido"),
  checkValidators,
];
