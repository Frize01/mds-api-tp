import express from "express";
import { body } from "express-validator";
import authenticateJWT from "../middlewares/authenticateJWT.js";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  patchUser,
  deleteUser,
} from "../controllers/userController.js";


const validationCreate = [
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("phone")
    .optional()
    .isNumeric()
    .withMessage("Phone number must contain only numbers"),
  body("name").notEmpty().withMessage("Name is required"),
  body("role")
    .notEmpty()
    .isIn(["admin", "user", "fournisseur"])
    .withMessage("Role must be either 'admin' or 'user' or 'fournisseur'"),
];

const validationUpdate = [
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("phone")
    .optional()
    .isNumeric()
    .withMessage("Phone number must contain only numbers"),
  body("name").notEmpty().withMessage("Name is required"),
  body("role")
    .notEmpty()
    .isIn(["admin", "user", "fournisseur"])
    .withMessage("Role must be either 'admin' or 'user' or 'fournisseur'"),
];

const validationPatch = [
  body("name").optional().notEmpty().withMessage("Name is required"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Please provide a valid email"),
  body("phone")
    .optional()
    .isNumeric()
    .withMessage("Phone number must contain only numbers"),
  body("role")
    .optional()
    .isIn(["admin", "user", "fournisseur"])
    .withMessage("Role must be either 'admin' or 'user' or 'fournisseur'"),
];


const userRouter = express.Router();

/**
 * @swagger
 * /v0/users:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 *     description: Cette route permet de récupérer la liste de tous les utilisateurs, excluant le mot de passe. Authentification JWT requise.
 *     tags: [Utilisateurs]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs récupérée avec succès.
 *       401:
 *         description: Non autorisé, JWT manquant ou invalide.
 *       500:
 *         description: Erreur du serveur lors de la récupération des utilisateurs.
 */
userRouter.get("/", authenticateJWT, getAllUsers);

/**
 * @swagger
 * /v0/users/{id}:
 *   get:
 *     summary: Récupérer un utilisateur par son ID
 *     description: Cette route permet de récupérer un utilisateur spécifique par son ID. Authentification JWT requise.
 *     tags: [Utilisateurs]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de l'utilisateur
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Utilisateur trouvé.
 *       404:
 *         description: Utilisateur non trouvé.
 *       401:
 *         description: Non autorisé, JWT manquant ou invalide.
 *       500:
 *         description: Erreur du serveur lors de la récupération de l'utilisateur.
 */
userRouter.get("/:id", authenticateJWT, getUserById);

// Documentation Swagger pour la route POST /users
/**
 * @swagger
 * /v0/users:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     description: Cette route permet de créer un utilisateur. Authentification JWT requise.
 *     tags: [Utilisateurs]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin, user, fournisseur]
 *               phone:
 *                 type: string
 *                 description: "Phone number must contain only numbers"
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès.
 *       400:
 *         description: Erreurs de validation dans les données fournies.
 *       401:
 *         description: Non autorisé, JWT manquant ou invalide.
 *       500:
 *         description: Erreur du serveur lors de la création de l'utilisateur.
 */
userRouter.post("/", authenticateJWT, validationCreate, createUser);

// Documentation Swagger pour la route PUT /users/{id}
/**
 * @swagger
 * /v0/users/{id}:
 *   put:
 *     summary: Mettre à jour un utilisateur par son ID
 *     description: Cette route permet de mettre à jour les informations d'un utilisateur par son ID. Authentification JWT requise.
 *     tags: [Utilisateurs]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur à mettre à jour
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin, user, fournisseur]
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès.
 *       400:
 *         description: Erreurs de validation dans les données fournies.
 *       404:
 *         description: Utilisateur non trouvé.
 *       401:
 *         description: Non autorisé, JWT manquant ou invalide.
 *       500:
 *         description: Erreur du serveur lors de la mise à jour de l'utilisateur.
 */
userRouter.put("/:id", authenticateJWT, validationUpdate, updateUser);

// Documentation Swagger pour la route PATCH /users/{id}
/**
 * @swagger
 * /v0/users/{id}:
 *   patch:
 *     summary: Mettre à jour partiellement un utilisateur par son ID
 *     description: Cette route permet de mettre à jour partiellement un utilisateur. Authentification JWT requise.
 *     tags: [Utilisateurs]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur à mettre à jour
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin, user, fournisseur]
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès.
 *       400:
 *         description: Erreurs de validation dans les données fournies.
 *       404:
 *         description: Utilisateur non trouvé.
 *       401:
 *         description: Non autorisé, JWT manquant ou invalide.
 *       500:
 *         description: Erreur du serveur lors de la mise à jour de l'utilisateur.
 */
userRouter.patch("/:id", authenticateJWT, validationPatch, patchUser);

// Documentation Swagger pour la route DELETE /users/{id}
/**
 * @swagger
 * /v0/users/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur par son ID
 *     description: Cette route permet de supprimer un utilisateur. Authentification JWT requise.
 *     tags: [Utilisateurs]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur à supprimer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès.
 *       404:
 *         description: Utilisateur non trouvé.
 *       401:
 *         description: Non autorisé, JWT manquant ou invalide.
 *       500:
 *         description: Erreur du serveur lors de la suppression de l'utilisateur.
 */
userRouter.delete("/:id", authenticateJWT, deleteUser);

export default userRouter;
