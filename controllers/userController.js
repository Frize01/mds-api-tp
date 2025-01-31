import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    res.send(users);
  } catch (error) {
    res.status(500).json({
      message: "Erreur du serveur lors de la récupération des utilisateurs.",
      error: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({
      attributes: ["id", "name", "email", "createdAt", "updatedAt", "role"],
      where: { id: req.params.id },
    });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.send(user);
  } catch (error) {
    res.status(500).json({
      message: "Erreur du serveur lors de la récupération de l'utilisateur.",
      error: error.message,
    });
  }
};

export const createUser = async (req, res) => {
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
};

export const updateUser = async (req, res) => {
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
};

export const patchUser = async (req, res) => {
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
};

export const deleteUser = async (req, res) => {
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
};
