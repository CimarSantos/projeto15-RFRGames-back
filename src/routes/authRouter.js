import { Router } from "express";
import { signUp } from "../controllers/authController.js";
import {
  thereIsUser,
  validadeSignUp,
  validateLogin,
} from "../middlewares/auth.middlewares.js";

const authRouter = Router();

authRouter.post("/sign-up", validadeSignUp, thereIsUser, signUp);
authRouter.post("/login", validateLogin, signUp);

export { authRouter };
