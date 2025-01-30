import express from "express";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";

const router = express.Router();

router.use("/auth", authRouter);

export default router;
