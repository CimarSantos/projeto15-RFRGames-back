import { Router } from "express";
import { getCart, postCart } from "../controllers/cartController.js";
import { cartGetValidation } from "../middlewares/cartGetValidation.js";
import { deleteCart } from "../controllers/cartController.js";
import { cartDeleteValidation } from "../middlewares/cartDeleteValidation.js";
import { cartPostValidation } from "../middlewares/cartPostValidation.js";


const cartRouter = Router();

cartRouter.get('/cart', cartGetValidation, getCart);
cartRouter.delete('/cart', cartDeleteValidation, deleteCart);
cartRouter.post('/cart', cartPostValidation, postCart);


export default cartRouter; 