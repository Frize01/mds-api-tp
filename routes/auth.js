import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const authRouter = express.Router();

authRouter.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        console.log(req.body);
        if (!user) {
            return res
                .status(401)
                .json({ message: "Invalid username or password" });
        }
        if (!(await bcrypt.compare(password, user.password))) {
            return res
                .status(401)
                .json({ message: "Invalid username or password" });
        }
        // Génération du token JWT
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.json({ message: "Auth", token });
    } catch (error) {
        console.error("Auth error:", error);
        res.status(500).json({ message: "Internal server error " + error });
    }
});

export default authRouter;
