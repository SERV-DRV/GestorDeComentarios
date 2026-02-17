"use strict";

import { Schema, model } from "mongoose";

const comentarieSchema = Schema({
  text: {
    type: String,
    required: [true, "El texto es obligatorio"],
    maxLength: [500, "El texto no puede exceder los 500 caracteres"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "El autor es obligatorio"],
  },
  publication: {
    type: Schema.Types.ObjectId,
    ref: "Publication",
    required: [true, "La publicación es obligatoria"],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model("Comentarie", comentarieSchema);
