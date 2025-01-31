import express from "express";
import dotenv from "dotenv";
import "./models/associations.js";
import router from "./router.js";
import path from "path";
import http from "http";
import { fileURLToPath } from "url";
import { dirname } from "path";
import setupSwagger from "./config/swagger.js";
import setupSocket from "./config/socket.js";

// Charger les variables d'environnement
dotenv.config();
const port = process.env.PORT;

// Initialiser l'application Express et le serveur HTTP
const app = express();
const server = http.createServer(app);

// Middleware pour parser le JSON
app.use(express.json());

// Convertir import.meta.url en équivalent __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configurer Swagger pour la documentation de l'API
setupSwagger(app);

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, "public")));

// Route pour servir la page d'accueil (socket.html)
app.get("/socket", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "socket.html"));
});

// Configurer Socket.IO
setupSocket(server);

// Définir les routes de l'API
app.use("/v0", router);

// Gérer les routes 404
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "404.html"));
});

// Démarrer le serveur
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
