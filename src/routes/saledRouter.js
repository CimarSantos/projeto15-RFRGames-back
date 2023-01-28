import { Router } from "express";
import { postSaled } from "../controllers/saledController.js";
import { saledPostValidation } from "../middlewares/saledPostValidation.js";
import { saledSchema } from "../schemas/saledSchema.js";

const saledRouter = Router(); 

saledRouter.post('/saled', saledPostValidation, validateSchema(saledSchema), postSaled);

export default saledRouter; 