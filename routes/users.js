import express from "express";
import User from "../models/User.js";
import authenticateJWT from "../middlewares/authenticateJWT.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";

const userRouter = express.Router();

const validationCreate = [
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
  body("phone").optional().isNumeric().withMessage("Phone number must contain only numbers"),
  body("name").notEmpty().withMessage("Name is required"),
  body("role").notEmpty().withMessage("Role is required"),
];

const validationUpdate = [
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("phone").optional().isNumeric().withMessage("Phone number must contain only numbers"),
  body("name").notEmpty().withMessage("Name is required"),
  body("role").notEmpty().withMessage("Role is required"),
];

const validationPatch = [
  body("name").optional().notEmpty().withMessage("Name is required"),
  body("role").optional().notEmpty().withMessage("Role is required"),
];

userRouter.get("/", authenticateJWT, async (req, res) => {
  // get all users
  const users = await User.findAll({
    attributes: { exclude: ["password"] },
  });
  res.send(users);
});

userRouter.get("/getById/:id", authenticateJWT, async (req, res) => {
  const user = await User.findOne({
    attributes: ["id", "name", "email", "createdAt", "updatedAt", "role"],
    where: { id: req.params.id },
  });
  res.send(user);
});

userRouter.post(
  "/",
  authenticateJWT,
  validationCreate,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, password, role } = req.body;
      const user = await User.create({
        name,
        email,
        password: await bcrypt.hash(password, 10),
        role,
      });
      res.status(201).json({
        message: "User created successfully",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Error creating user", error: error.message });
    }
  }
);

userRouter.put("/:id", authenticateJWT, validationUpdate, async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.update({
      name: name || user.name,
      email: email || user.email,
      role: role || user.role
    });

    res.json({
      message: "User updated successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
});

userRouter.patch("/:id", authenticateJWT, validationPatch, async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.update({
      name: name || user.name,
      role: role || user.role
    });
    res.json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
});

userRouter.delete("/:id", authenticateJWT, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
});

export default userRouter;
