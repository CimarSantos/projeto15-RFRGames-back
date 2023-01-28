import { Router } from "express";
import { getCart } from "../controllers/cartController.js";
import { cartGetValidation } from "../middlewares/cartGetValidation.js";
import { deleteCart } from "../controllers/cartController.js";
import { cartDeleteValidation } from "../middlewares/cartDeleteValidation.js";

const cartRouter = Router(); 

cartRouter.get('/cart', cartGetValidation, getCart);
cartRouter.delete('/cart', cartDeleteValidation, deleteCart);

export default cartRouter; 