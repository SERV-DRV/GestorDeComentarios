'use strict';

import mongoose from 'mongoose';

const publicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'El ID del usuario es requerido']
  },
  title: {
    type: String,
    required: [true, 'El título es obligatorio'],
    trim: true,
    maxLength: [150, 'El título no puede exceder 150 caracteres']
  },
  category: {
    type: String,
    required: [true, 'La categoría es obligatoria'],
    trim: true,
    maxLength: [50, 'La categoría no puede exceder 50 caracteres']
  },
  content: {
    type: String,
    required: [true, 'El contenido es obligatorio'],
    trim: true
  },
  photo: {
    type: String,
    default: 'photos/default_publication'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Publication', publicationSchema);
