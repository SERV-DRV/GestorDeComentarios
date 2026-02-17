"use strict";

import mongoose from "mongoose";
import Publication from "./publication.model.js";
import { cloudinary } from "../../middlewares/file-uploader.js";

export const getPublications = async (req, res) => {
  try {
    const { isActive } = req.query;
    const filter = {};
    if (isActive !== undefined) filter.isActive = isActive === "true";
    const publications = await Publication.find(filter).sort({ createAt: -1 });

    res.status(200).json({
      succes: true,
      total: publications.length,
      data: publications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener las publicaciones",
      error: error.message,
    });
  }
};

export const getPublicationById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "ID no válido" });
    }

    const publication = await Publication.findById(id);
    if (!publication) {
      return res.status(404).json({
        success: false,
        message: "Publicación no encontrada",
      });
    }

    res.status(200).json({ success: true, data: publication });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener la publicación",
      error: error.message,
    });
  }
};

export const createPublication = async (req, res) => {
  try {
    const publicationData = req.body;

    if (req.file) {
      const extension = req.file.path.split(".").pop();
      const fileName = req.file.filename;

      const relativePath = fileName.substring(fileName.indexOf("photos/"));

      publicationData.photo = `${relativePath}.${extension}`;
    } else {
      publicationData.photo = "photos/default_publication";
    }

    publicationData.createAt = new Date();

    const publication = new Publication(publicationData);
    await publication.save();

    res.status(201).json({
      succes: true,
      message: "Publicación creada exitosamente",
      data: publication,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: "Error al crear la publicación",
      error: error.message,
    });
  }
};

export const updatePublication = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "ID no válido" });
    }

    if (req.file) {
      const currentPublication = await Publication.findById(id);

      if (currentPublication && currentPublication.photo) {
        const photoPath = currentPublication.photo;
        const photoWithoutExt = photoPath.substring(
          0,
          photoPath.lastIndexOf("."),
        );

        const publicId = `angendaSexto/${photoWithoutExt}`;

        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (deleteError) {
          console.error(
            `Error al eliminar la imagen anterior de Cloudinary: ${deleteError.message}`,
          );
        }
      }

      const extension = req.file.path.split(".").pop();
      const fileName = req.file.filename;

      const relativePath = fileName.includes("photos/")
        ? fileName.substring(fileName.indexOf("photos/"))
        : fileName;

      updateData.photo = `${relativePath}.${extension}`;
    }

    const publication = await Publication.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!publication) {
      return res.status(404).json({
        success: false,
        message: "Publicación no encontrada",
      });
    }

    res.status(200).json({
      success: true,
      message: "Publicación actualizada exitosamente",
      data: publication,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error al actualizar la publicación",
      error: error.message,
    });
  }
};

export const changePublicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const isActive = req.url.includes("/activate");
    const action = isActive ? "activada" : "desactivada";

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "ID no válido" });
    }

    const publication = await Publication.findByIdAndUpdate(
      id,
      { isActive },
      { new: true },
    );

    if (!publication) {
      return res.status(404).json({
        success: false,
        message: "Publicación no encontrada",
      });
    }

    res.status(200).json({
      success: true,
      message: `Publicación ${action} exitosamente`,
      data: publication,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al cambiar el estado de la publicación",
      error: error.message,
    });
  }
};
