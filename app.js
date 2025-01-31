import express from "express";
import dotenv from "dotenv";
import "./models/associations.js";
import router from "./router.js";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import http from "http";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dab from "./helpers/dab.js";
// Configuration du port
dotenv.config();
const port = process.env.PORT;

const app = express();
const server = http.createServer(app); // Créer un serveur HTTP avec Express
const io = new Server(server); // Attacher Socket.IO au serveur HTTP

// Middleware pour parser le JSON
app.use(express.json());

// Convert import.meta.url to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Option Swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Mon API",
            version: "1.0.0",
            description: "Documentation de mon API",
        },
        tags: [
            { name: "Auth", description: "API pour l'authentification" },
            { name: "Utilisateurs", description: "API pour les utilisateurs" },
            { name: "Produits", description: "API pour les produits" },
        ],
        security: [{ BearerAuth: [] }],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "apiKey",
                    in: "header",
                    name: "Authorization",
                    description:
                        "Entrez le token JWT comme suit: `Bearer <votre_token>`",
                },
            },
        },
        servers: [{ name: "Localhost Node", url: "http://localhost:3000" }],
    },
    apis: ["./routes/*.js"], // Indiquer les fichiers où se trouvent les annotations Swagger
};

// Générer la documentation Swagger
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Utiliser express.static() pour servir les fichiers statiques, y compris le HTML
app.use(express.static(path.join(__dirname, "public"))); // Dossier public

// Route pour servir la page d'accueil (socket.html)
app.get("/socket", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "socket.html")); // Chemin vers ton fichier HTML
});

// Liste des utilisateurs connectés
let users = [];

io.on("connection", (socket) => {
    console.log("A user connected");

    // Lorsque le client envoie un message
    socket.on("sendMessage", (message) => {
        const user = socket.id; // Utiliser l'ID du socket comme identifiant unique
        console.log(`Message from ${user}: ${message}`);

        // Check if message starts with /dab
        if (message.startsWith("/dab")) {
            // Extract the number after /dab
            const somme = parseFloat(message.split("/dab")[1]);

            // Validate if it's a valid number
            if (isNaN(somme)) {
                socket.emit(
                    "message",
                    "System",
                    "Erreur: Veuillez entrer un nombre valide après /dab"
                );
                return;
            }

            const result = dab({ somme: somme, devise: "€" });

            // Format the result message
            let dabMessage = "";
            result.forEach((item) => {
                dabMessage += `${item.nombre} ${item.type} de ${item.valeur}€<br>`;
            });

            // Send result back to user
            socket.emit("message", "DAB", dabMessage);
            return;
        }

        // Diffuser le message à tous les clients sauf l'émetteur
        socket.broadcast.emit("message", user, message);
    });

    // Lorsqu'un utilisateur se déconnecte
    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

// API
app.use("/v0", router);

// 404
app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "404.html"));
});

// Démarrer le serveur
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;
