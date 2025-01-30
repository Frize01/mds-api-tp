import express from "express";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/users.js";
import productRouter from "./routes/products.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/products", productRouter);

export default router;
