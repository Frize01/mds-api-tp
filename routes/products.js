import express from "express";
import Product from "../models/Product.js";
import authenticateJWT from "../middlewares/authenticateJWT.js";
import { body, validationResult } from "express-validator";

const productRouter = express.Router();

/* Example JSON for testing API routes:
{
    "name": "iPhone 14",
    "description": "Latest iPhone model with advanced features",
    "price": 999.99,
    "stock": 50,
    "reduce_pourcentage": 10.5,
    "reference": "IP14-2023",
    "category": "product"
}
*/

const validationCreate = [
    body("name").notEmpty().withMessage("Name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("price").isFloat({ gt: 0 }).withMessage("Price must be a positive number"),
    body("stock").isInt({ min: 0 }).withMessage("Stock must be a non-negative integer"),
    body("reduce_pourcentage").isFloat({ min: 0, max: 100 }).withMessage("Reduce percentage must be between 0 and 100"),
    body("reference").notEmpty().withMessage("Reference is required"),
    body("category").isIn(['service', 'product']).withMessage("Category must be either 'service' or 'product'"),
];

const validationUpdate = [
    body("name").notEmpty().withMessage("Name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("price").isFloat({ gt: 0 }).withMessage("Price must be a positive number"),
    body("stock").isInt({ min: 0 }).withMessage("Stock must be a non-negative integer"),
    body("reduce_pourcentage").isFloat({ min: 0, max: 100 }).withMessage("Reduce percentage must be between 0 and 100"),
    body("reference").notEmpty().withMessage("Reference is required"),
    body("category").isIn(['service', 'product']).withMessage("Category must be either 'service' or 'product'"),
];

const validationPatch = [
    body("name").optional().notEmpty().withMessage("Name is required"),
    body("description").optional().notEmpty().withMessage("Description is required"),
    body("price").optional().isFloat({ gt: 0 }).withMessage("Price must be a positive number"),
    body("stock").optional().isInt({ min: 0 }).withMessage("Stock must be a non-negative integer"),
    body("reduce_pourcentage").optional().isFloat({ min: 0, max: 100 }).withMessage("Reduce percentage must be between 0 and 100"),
    body("reference").optional().notEmpty().withMessage("Reference is required"),
    body("category").optional().isIn(['service', 'product']).withMessage("Category must be either 'service' or 'product'"),
];

productRouter.get("/", authenticateJWT, async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json({ message: "Products", products });
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }
});

productRouter.get("/:id", authenticateJWT, async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        res.json({ message: "Product", product });
    } catch (error) {
        res.status(500).json({ message: "Error fetching product", error: error.message });
    }
});

productRouter.post("/", authenticateJWT, validationCreate, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const product = await Product.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            reduce_pourcentage: req.body.reduce_pourcentage,
            reference: req.body.reference,
            category: req.body.category,
        });
        res.json({ message: "Product created", product });
    } catch (error) {
        res.status(500).json({ message: "Error creating product", error: error.message });
    }
});

productRouter.put("/:id", authenticateJWT, validationUpdate, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        await product.update({
            name: req.body.name || product.name,
            description: req.body.description || product.description,
            price: req.body.price || product.price,
            stock: req.body.stock || product.stock,
            reference: req.body.reference || product.reference,
            category: req.body.category || product.category,
            reduce_pourcentage: req.body.reduce_pourcentage || product.reduce_pourcentage,
        });
        res.json({ message: "Product updated", product });
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error: error.message });
    }
});

productRouter.patch("/:id", authenticateJWT, validationPatch, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        await product.update({
            name: req.body.name || product.name,
            description: req.body.description || product.description,
            price: req.body.price || product.price,
            stock: req.body.stock || product.stock,
            reduce_pourcentage: req.body.reduce_pourcentage || product.reduce_pourcentage,
            reference: req.body.reference || product.reference,
            category: req.body.category || product.category,
        });
        res.json({ message: "Product updated", product });
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error: error.message });
    }
});

productRouter.delete("/:id", authenticateJWT, async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        await product.destroy();
        res.json({ message: "Product deleted", product });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error: error.message });
    }
});

export default productRouter;