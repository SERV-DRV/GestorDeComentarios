"use strict";

import { body, param } from "express-validator";
import { checkValidators } from "./check-validators.js";

export const validateCreateComentarie = [
  body("text")
    .notEmpty()
    .withMessage("El texto del comentarie es obligatorio")
    .isLength({ max: 500 })
    .withMessage("El texto no puede exceder los 500 caracteres"),
  body("user")
    .notEmpty()
    .withMessage("El ID del autor es obligatorio")
    .isMongoId()
    .withMessage("ID de autor no es un ID de MongoDB válido"),
  body("publication")
    .notEmpty()
    .withMessage("El ID de la publicación es obligatorio")
    .isMongoId()
    .withMessage("ID de publicación no es un ID de MongoDB válido"),
  checkValidators,
];

export const validateGetComentarieById = [
  param("id")
    .notEmpty()
    .withMessage("El ID es obligatorio")
    .isMongoId()
    .withMessage("ID de MongoDB no válido"),
  checkValidators,
];

export const validateUpdateComentarie = [
  param("id")
    .notEmpty()
    .withMessage("El ID del comentarie es obligatorio")
    .isMongoId()
    .withMessage("ID de comentarie no válido"),
  body("text")
    .notEmpty()
    .withMessage("El nuevo texto no puede estar vacío")
    .isLength({ max: 500 })
    .withMessage("El texto no puede exceder los 500 caracteres"),
  body("user")
    .notEmpty()
    .withMessage("El ID del autor es necesario para validar la autoría")
    .isMongoId()
    .withMessage("ID de autor no válido"),
  checkValidators,
];

export const validateComentarieStatusChange = [
  param("id")
    .notEmpty()
    .withMessage("El ID del comentarie es obligatorio")
    .isMongoId()
    .withMessage("ID no válido"),
  body("user")
    .notEmpty()
    .withMessage("El ID del autor es necesario para validar la autoría")
    .isMongoId()
    .withMessage("ID de autor no válido"),
  checkValidators,
];
