import express from "express";
import { body, validationResult } from "express-validator";
import { registerUser, authenticateUser } from "../controllers/authController.js";

const authRouter = express.Router();

const validateBody = [
  body("email").notEmpty().isEmail().withMessage("Invalid email"),
  body("password")
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

const validateBodyRegister = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").notEmpty().isEmail().withMessage("Invalid email"),
  body("password")
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("role").notEmpty().withMessage("Role is required"),
  body("phone").optional().isMobilePhone().withMessage("Invalid phone number"),
];

/**
 * @swagger
 * /v0/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Créer un utilisateur
 *     description: Permet de créer un nouvel utilisateur avec un nom, un email, un mot de passe, un rôle et un numéro de téléphone.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Le nom de l'utilisateur
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 description: L'email de l'utilisateur
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 description: Le mot de passe de l'utilisateur
 *                 example: "password123"
 *               role:
 *                 type: string
 *                 description: Le rôle de l'utilisateur
 *                 example: "admin"
 *               phone:
 *                 type: string
 *                 description: Le numéro de téléphone de l'utilisateur
 *                 example: "1234567890"
 *     responses:
 *       200:
 *         description: Utilisateur créé avec succès
 *       500:
 *         description: Erreur lors de la création de l'utilisateur
 */
authRouter.post("/register", validateBodyRegister, registerUser);

/**
 * @swagger
 * /v0/auth:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Authentification d'un utilisateur
 *     description: Permet à un utilisateur de se connecter en utilisant son email et son mot de passe. Si l'authentification réussit, un token JWT est généré.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: L'email de l'utilisateur
 *                 example: "utilisateur@example.com"
 *               password:
 *                 type: string
 *                 description: Le mot de passe de l'utilisateur
 *                 example: "motdepasse123"
 *     responses:
 *       200:
 *         description: Connexion réussie, un token JWT est généré et renvoyé
 *       401:
 *         description: Échec de l'authentification, mauvais email ou mot de passe
 *       500:
 *         description: Erreur interne du serveur
 */
authRouter.post("/", validateBody, authenticateUser);

export default authRouter;
