import { Router } from "express";
import { getGames } from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/games/:type", getGames);

export { userRouter };
