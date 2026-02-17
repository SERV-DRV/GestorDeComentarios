"use strict";

import { Router } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  changeUserStatus,
  loginUser,
} from "./user.controller.js";

import {
  validateCreateUser,
  validateGetUserById,
  validateUpdateUser,
  validateUserStatusChange,
  validateLoginUser,
} from "../../middlewares/users-validation.js";

import { uploadUserImage } from "../../middlewares/file-uploader.js";

const router = Router();

//GET
router.get("/", getUsers);
router.get("/:id", validateGetUserById, getUserById);

//POST
router.post("/login", validateLoginUser, loginUser);
router.post(
  "/",
  uploadUserImage.single("photo"),
  validateCreateUser,
  createUser,
);

//PUT
router.put(
  "/:id",
  uploadUserImage.single("photo"),
  validateUpdateUser,
  updateUser,
);
router.put("/:id/activate", validateUserStatusChange, changeUserStatus);
router.put("/:id/desactivate", validateUserStatusChange, changeUserStatus);

export default router;
