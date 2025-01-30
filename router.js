import express from "express";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/users.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);

export default router;
