import express from "express";
import { signInUser, signUpUser } from "../controllers/authController";

const authRouter = express.Router();

authRouter.post('/sign-up', signUpUser);
authRouter.post('/sign-in', signInUser);

export default authRouter;
