import Product from "../models/Product.js";
import { validationResult } from "express-validator";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json({ message: "Products", products });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product", product });
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error: error.message });
  }
};

export const createProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const product = await Product.create(req.body);
    res.json({ message: "Product created", product });
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.update(req.body);
    res.json({ message: "Product updated", product });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
};

export const patchProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.update(req.body);
    res.json({ message: "Product updated", product });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.destroy();
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error: error.message });
  }
};
