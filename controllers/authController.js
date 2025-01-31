import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
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
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la création de l'utilisateur",
      error: error.message,
    });
  }
};

export const authenticateUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "30d" },
    );

    res.json({ message: "Auth", token });
  } catch (error) {
    console.error("Auth error:", error);
    res.status(500).json({ message: "Internal server error " + error });
  }
};
