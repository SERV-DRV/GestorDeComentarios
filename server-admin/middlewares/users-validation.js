'use strict';

import { body, param } from 'express-validator';
import { checkValidators } from "./check-validators.js";

export const validateCreateUser = [
    body('username')
        .trim()
        .notEmpty()
        .withMessage('El nombre de usuario es obligatorio')
        .isLength({ min: 3, max: 30 })
        .withMessage('El nombre de usuario debe tener entre 3 y 30 caracteres'),
    body('email')
        .trim()
        .notEmpty()
        .withMessage('El correo electrónico es obligatorio')
        .isEmail()
        .normalizeEmail()
        .withMessage('Por favor ingrese un correo electrónico válido'),
    body('password')
        .notEmpty()
        .withMessage('La contraseña es obligatoria')
        .isLength({ min: 6 })
        .withMessage('La contraseña debe tener al menos 6 caracteres'),
    checkValidators
];

export const validateGetUserById = [
    param('id')
        .notEmpty()
        .withMessage('El ID es obligatorio')
        .isMongoId()
        .withMessage('No es un ID de MongoDB válido'),
    checkValidators
];

export const validateUpdateUser = [
    param('id')
        .notEmpty()
        .withMessage('El ID es obligatorio')
        .isMongoId()
        .withMessage('No es un ID de MongoDB válido'),
    body('username')
        .optional()
        .isLength({ min: 3, max: 30 })
        .withMessage('El nombre de usuario debe tener entre 3 y 30 caracteres'),
    body('email')
        .optional()
        .isEmail()
        .withMessage('Por favor ingrese un correo electrónico válido'),
    body('passwordActual')
        .optional()
        .isLength({ min: 6 })
        .withMessage('La contraseña actual debe tener al menos 6 caracteres'),
    body('passwordNueva')
        .optional()
        .isLength({ min: 6 })
        .withMessage('La nueva contraseña debe tener al menos 6 caracteres'),
    checkValidators
];

export const validateUserStatusChange = [
    param('id')
        .notEmpty()
        .withMessage('El ID es obligatorio')
        .isMongoId()
        .withMessage('Debe ser un ID de MongoDB válido'),
    checkValidators
];

export const validateLoginUser = [
    body('login')
        .notEmpty()
        .withMessage('El correo electrónico o nombre de usuario es obligatorio'),
    body('password')
        .notEmpty()
        .withMessage('La contraseña es obligatoria'),
    checkValidators
];
