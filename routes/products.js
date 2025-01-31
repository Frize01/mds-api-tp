import express from "express";
import Product from "../models/Product.js";
import authenticateJWT from "../middlewares/authenticateJWT.js";
import { body, validationResult } from "express-validator";
import { getAllProducts, getProductById, createProduct, updateProduct, patchProduct, deleteProduct } from "../controllers/productController.js";
const productRouter = express.Router();

const validationCreate = [
  // Validations pour la création de produit
  body("name").notEmpty().withMessage("Name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("price")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),
  body("stock")
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer"),
  body("reduce_pourcentage")
    .isFloat({ min: 0, max: 100 })
    .withMessage("Reduce percentage must be between 0 and 100"),
  body("reference").notEmpty().withMessage("Reference is required"),
  body("category")
    .isIn(["service", "product"])
    .withMessage("Category must be either 'service' or 'product'"),
];

const validationUpdate = [
  // Validations pour la mise à jour complète de produit
  body("name").notEmpty().withMessage("Name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("price")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),
  body("stock")
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer"),
  body("reduce_pourcentage")
    .isFloat({ min: 0, max: 100 })
    .withMessage("Reduce percentage must be between 0 and 100"),
  body("reference").notEmpty().withMessage("Reference is required"),
  body("category")
    .isIn(["service", "product"])
    .withMessage("Category must be either 'service' or 'product'"),
];

const validationPatch = [
  // Validations pour la mise à jour partielle de produit
  body("name").optional().notEmpty().withMessage("Name is required"),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("Description is required"),
  body("price")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),
  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer"),
  body("reduce_pourcentage")
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage("Reduce percentage must be between 0 and 100"),
  body("reference").optional().notEmpty().withMessage("Reference is required"),
  body("category")
    .optional()
    .isIn(["service", "product"])
    .withMessage("Category must be either 'service' or 'product'"),
];

/**
 * @swagger
 * /v0/products:
 *   get:
 *     summary: "Obtenir la liste de tous les produits"
 *     description: "Cette route permet de récupérer tous les produits disponibles dans la base de données."
 *     tags:
 *       - "Produits"
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: "Liste des produits récupérée avec succès."
 *       500:
 *         description: "Erreur lors de la récupération des produits."
 */
productRouter.get("/", authenticateJWT, getAllProducts);

/**
 * @swagger
 * /v0/products/{id}:
 *   get:
 *     summary: "Obtenir un produit spécifique"
 *     description: "Cette route permet de récupérer un produit spécifique en fonction de son ID."
 *     tags:
 *       - "Produits"
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "ID du produit à récupérer."
 *         required: true
 *         schema:
 *           type: "integer"
 *     responses:
 *       200:
 *         description: "Produit récupéré avec succès."
 *       404:
 *         description: "Produit non trouvé."
 *       500:
 *         description: "Erreur lors de la récupération du produit."
 */
productRouter.get("/:id", authenticateJWT, getProductById);

/**
 * @swagger
 * /v0/products:
 *   post:
 *     summary: "Créer un nouveau produit"
 *     description: "Cette route permet de créer un nouveau produit dans la base de données."
 *     tags:
 *       - "Produits"
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: "object"
 *             properties:
 *               name:
 *                 type: "string"
 *               description:
 *                 type: "string"
 *               price:
 *                 type: "number"
 *                 format: "float"
 *                 default: 10
 *               stock:
 *                 type: "integer"
 *               reduce_pourcentage:
 *                 type: "number"
 *                 format: "float"
 *               reference:
 *                 type: "string"
 *               category:
 *                 type: "string"
 *                 default: "product"
 *     responses:
 *       200:
 *         description: "Produit créé avec succès."
 *       400:
 *         description: "Données invalides fournies dans la requête."
 *       500:
 *         description: "Erreur lors de la création du produit."
 */
productRouter.post("/", authenticateJWT, validationCreate, createProduct);

/**
 * @swagger
 * /v0/products/{id}:
 *   put:
 *     summary: "Mettre à jour un produit existant"
 *     description: "Cette route permet de mettre à jour un produit existant dans la base de données."
 *     tags:
 *       - "Produits"
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "ID du produit à mettre à jour."
 *         required: true
 *         schema:
 *           type: "integer"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: "object"
 *             properties:
 *               name:
 *                 type: "string"
 *               description:
 *                 type: "string"
 *               price:
 *                 type: "number"
 *                 format: "float"
 *               stock:
 *                 type: "integer"
 *               reduce_pourcentage:
 *                 type: "number"
 *                 format: "float"
 *               reference:
 *                 type: "string"
 *               category:
 *                 type: "string"
 *                 default: "product"
 *     responses:
 *       200:
 *         description: "Produit mis à jour avec succès."
 *       400:
 *         description: "Données invalides fournies dans la requête."
 *       404:
 *         description: "Produit non trouvé."
 *       500:
 *         description: "Erreur lors de la mise à jour du produit."
 */
productRouter.put("/:id", authenticateJWT, validationUpdate, updateProduct);

/**
 * @swagger
 * /v0/products/{id}:
 *   patch:
 *     summary: "Mettre à jour partiellement un produit"
 *     description: "Cette route permet de mettre à jour certaines propriétés d'un produit existant."
 *     tags:
 *       - "Produits"
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "ID du produit à mettre à jour."
 *         required: true
 *         schema:
 *           type: "integer"
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: "object"
 *             properties:
 *               name:
 *                 type: "string"
 *               description:
 *                 type: "string"
 *               price:
 *                 type: "number"
 *                 format: "float"
 *                 default: 10
 *               stock:
 *                 type: "integer"
 *               reduce_pourcentage:
 *                 type: "number"
 *                 format: "float"
 *               reference:
 *                 type: "string"
 *               category:
 *                 type: "string"
 *                 default: "product"
 *     responses:
 *       200:
 *         description: "Produit mis à jour partiellement avec succès."
 *       404:
 *         description: "Produit non trouvé."
 *       500:
 *         description: "Erreur lors de la mise à jour du produit."
 */
productRouter.patch("/:id", authenticateJWT, validationPatch, patchProduct);

/**
 * @swagger
 * /v0/products/{id}:
 *   delete:
 *     summary: "Supprimer un produit"
 *     description: "Cette route permet de supprimer un produit spécifique de la base de données."
 *     tags:
 *       - "Produits"
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "ID du produit à supprimer."
 *         required: true
 *         schema:
 *           type: "integer"
 *     responses:
 *       200:
 *         description: "Produit supprimé avec succès."
 *       404:
 *         description: "Produit non trouvé."
 *       500:
 *         description: "Erreur lors de la suppression du produit."
 */
productRouter.delete("/:id", authenticateJWT, deleteProduct);

export default productRouter;
