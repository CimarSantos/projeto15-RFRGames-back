import { Router } from "express";
import { getGames } from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/games", getGames);

export { userRouter };
