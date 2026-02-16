"use strict";

import mongoose from "mongoose";

const userSchema = new mongoose.Schema( {
    username: {
      type: String,
      required: [true, "El nombre de usuario es requerido"],
      unique: true,
      trim: true,
      minLength: [3, "El nombre de usuario debe tener al menos 3 caracteres"],
      maxLength: [30, "El nombre de usuario no puede exceder 30 caracteres"],
    },

    email: {
      type: String,
      required: [true, "El correo electrónico es requerido"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Correo electrónico no válido",
      ],
    },
    photo: {
      type: String,
      default: "kinalface-default.png",
    },
    password: {
      type: String,
      required: [true, "La contraseña es requerida"],
      minLength: [6, "La contraseña debe tener al menos 6 caracteres"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
);

export default mongoose.model("User", userSchema);