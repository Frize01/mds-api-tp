import express from "express";
import User from "../models/User.js";
import authenticateJWT from "../middlewares/authenticateJWT.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";

const userRouter = express.Router();

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
userRouter.get("/", authenticateJWT, async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ["password"] },
  });
  res.send(users);
});

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

userRouter.get("/:id", authenticateJWT, async (req, res) => {
  const user = await User.findOne({
    attributes: ["id", "name", "email", "createdAt", "updatedAt", "role"],
    where: { id: req.params.id },
  });
  res.send(user);
});

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
userRouter.post("/", authenticateJWT, validationCreate, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, password, role, phone } = req.body;
    const user = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      role,
      phone: phone || null,
    });
    res.status(201).json({
      message: "Utilisateur créé avec succès",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la création de l'utilisateur",
      error: error.message,
    });
  }
});

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
userRouter.put("/:id", authenticateJWT, validationUpdate, async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    await user.update({
      name: name || user.name,
      email: email || user.email,
      role: role || user.role,
    });

    res.json({
      message: "Utilisateur mis à jour avec succès",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour de l'utilisateur",
      error: error.message,
    });
  }
});

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
userRouter.patch("/:id", authenticateJWT, validationPatch, async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    await user.update({
      name: name || user.name,
      role: role || user.role,
    });
    res.json({ message: "Utilisateur mis à jour avec succès", user });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour de l'utilisateur",
      error: error.message,
    });
  }
});

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
userRouter.delete("/:id", authenticateJWT, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    await user.destroy();
    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la suppression de l'utilisateur",
      error: error.message,
    });
  }
});

export default userRouter;
