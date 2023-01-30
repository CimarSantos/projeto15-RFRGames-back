import { Router } from "express";
import { deleteSaled, postSaled } from "../controllers/saledController.js";
import { saledPostValidation } from "../middlewares/saledPostValidation.js";
import { saledSchema } from "../schemas/saledSchema.js";
import { validateSchema } from '../schemas/validateSchema.js';

const saledRouter = Router(); 

saledRouter.post('/saled', saledPostValidation, validateSchema(saledSchema), postSaled);
saledRouter.delete('/saled', deleteSaled)

export default saledRouter; 