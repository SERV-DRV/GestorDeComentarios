"use strict";

import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { corsOptions } from "./cors-configuration.js";
import { dbConnection } from "./db.js";

import usersRoutes from "../src/users/user.routes.js";
import publicationsRoutes from "../src/publications/publication.routes.js";
import comentariesRoutes from "../src/comentaries/comentarie.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = "/kinalface/v1";

const middlewares = (app) => {
  app.use(express.urlencoded({ extended: false, limit: "10mb" }));
  app.use(express.json({ limit: "10mb" }));
  app.use(cors(corsOptions));
  app.use(morgan("dev"));
  app.use(express.static(path.join(__dirname, "../assets")));
};

const routes = (app) => {
  app.use(`${BASE_URL}/users`, usersRoutes);
  app.use(`${BASE_URL}/publications`, publicationsRoutes);
  app.use(`${BASE_URL}/comentaries`, comentariesRoutes);

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../assets/index.html"));
  });
};

const initServer = async () => {
  const app = express();
  const PORT = process.env.PORT || 3001;
  
  try {
    await dbConnection();
    middlewares(app);
    routes(app);

    app.listen(PORT, () => {
      console.log(`-----------------------------------------`);
      console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
      console.log(`🌐 Frontend: http://localhost:${PORT}`);
      console.log(`📡 API URL:  http://localhost:${PORT}${BASE_URL}`);
      console.log(`-----------------------------------------`);
    });

    app.get(`${BASE_URL}/health`, (req, res) => {
      res.status(200).json({
        status: "ok",
        service: "FaceKinal Admin",
        version: "1.0.0",
      });
    });
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error);
  }
};

export { initServer };