"use strict";

import mongoose from "mongoose";
import User from "./user.model.js";

export const getUsers = async (req, res) => {
  try {
    const { isActive } = req.query;
    const filter = {};
    if (isActive !== undefined) {
      filter.isActive = isActive === "true";
    }

    const users = await User.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener los usuarios",
      error: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "ID de MongoDB no válido",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener el usuario",
      error: error.message,
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const userData = req.body;

    if (req.file) {
      const extension = req.file.path.split(".").pop();
      const fileName = req.file.filename;
      const relativePath = fileName.substring(fileName.indexOf("photos/"));
      userData.photo = `${relativePath}.${extension}`;
    } else {
      userData.photo = "photos/default_user";
    }

    const existingUser = await User.findOne({
      $or: [{ email: userData.email }, { username: userData.username }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "El correo o nombre de usuario ya existe",
      });
    }

    const user = new User(userData);
    await user.save();

    res.status(201).json({
      success: true,
      message: "Usuario creado exitosamente",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al crear el usuario",
      error: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ success: false, message: "ID no válido" });

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ success: false, message: "Usuario no encontrado" });

    if (req.file) {
      const extension = req.file.path.split(".").pop();
      const fileName = req.file.filename;
      const relativePath = fileName.substring(fileName.indexOf("photos/"));
      updateData.photo = `${relativePath}.${extension}`;
    }

    if (updateData.passwordNueva) {
      if (!updateData.passwordActual || updateData.passwordActual !== user.password) {
        return res.status(400).json({ success: false, message: "Contraseña actual incorrecta" });
      }
      updateData.password = updateData.passwordNueva;
      delete updateData.passwordNueva;
      delete updateData.passwordActual;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, message: "Usuario actualizado exitosamente", data: updatedUser });
  } catch (error) {
    res.status(400).json({ success: false, message: "Error al actualizar el usuario", error: error.message });
  }
};



export const changeUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const isActive = req.url.includes("/activate");
    const action = isActive ? "activado" : "desactivado";

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "ID no válido" });
    }

    const user = await User.findByIdAndUpdate(id, { isActive }, { new: true });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Usuario no encontrado" });
    }

    res.status(200).json({
      success: true,
      message: `Usuario ${action} exitosamente`,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al cambiar el estado",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
    try {
        const { login, password } = req.body;

        const user = await User.findOne({
            $or: [{ email: login }, { username: login }],
            isActive: true
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        if (user.password !== password) {
            return res.status(401).json({
                success: false,
                message: 'Contraseña incorrecta'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Login exitoso',
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al iniciar sesión',
            error: error.message
        });
    }
};