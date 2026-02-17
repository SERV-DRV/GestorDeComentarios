"use strict";

import mongoose from "mongoose";
import Comentarie from "./comentarie.model.js";

export const getComentaries = async (req, res) => {
  try {
    const { idPublication } = req.params;

    const comentaries = await Comentarie.find({
      publication: idPublication,
      isActive: true,
    }).populate("user", "username photo");

    res.status(200).json({
      succes: true,
      total: comentaries.length,
      data: comentaries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener los comentaries",
      error: error.message,
    });
  }
};

export const getComentarieById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "ID de MongoDB no válido",
      });
    }

    const comentarie = await Comentarie.findById(id).populate(
      "user",
      "username photo",
    );

    if (!comentarie) {
      return res.status(404).json({
        success: false,
        message: "Comentarie no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      data: comentarie,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener el comentarie",
      error: error.message,
    });
  }
};

export const createComentarie = async (req, res) => {
  try {
    const data = req.body;

    const comentarie = new Comentarie(data);
    await comentarie.save();

    res.status(201).json({
      succes: true,
      message: "Comentarie creado exitosamente",
      data: comentarie,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: "Error al crear el comentarie",
      error: error.message,
    });
  }
};

export const updateComentarie = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, user } = req.body;

    const current = await Comentarie.findById(id);

    if (!current) {
      return res
        .status(404)
        .json({ success: false, message: "Comentarie no encontrado" });
    }

    if (current.user.toString() !== user) {
      return res.status(403).json({
        success: false,
        message:
          "No tienes permiso para editar este comentarie (No eres el autor)",
      });
    }

    const updated = await Comentarie.findByIdAndUpdate(
      id,
      { text },
      { new: true, runValidators: true },
    );

    res.status(200).json({
      success: true,
      message: "Comentarie actualizado exitosamente",
      data: updated,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error al actualizar el comentarie",
      error: error.message,
    });
  }
};

export const changeComentarieStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req.body;
    const isActive = req.url.includes("/activate");
    const action = isActive ? "activado" : "desactivado";

    const current = await Comentarie.findById(id);

    if (!current) {
      return res
        .status(404)
        .json({ success: false, message: "Comentarie no encontrado" });
    }

    if (current.user.toString() !== user) {
      return res.status(403).json({
        success: false,
        message: `No tienes permiso para realizar esta acción sobre este comentarie`,
      });
    }

    const comentarie = await Comentarie.findByIdAndUpdate(
      id,
      { isActive },
      { new: true },
    );

    res.status(200).json({
      success: true,
      message: `Comentarie ${action} exitosamente`,
      data: comentarie,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al cambiar el estado del comentarie",
      error: error.message,
    });
  }
};
