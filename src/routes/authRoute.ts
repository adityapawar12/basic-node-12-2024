import express from "express";
import { signInUser, signUpUser } from "../controllers/authController";
import rolesRouter from "./roleRoute";

const authRouter = express.Router();

authRouter.use("/roles", rolesRouter);

authRouter.post("/sign-up", signUpUser);
authRouter.post("/sign-in", signInUser);

export default authRouter;
