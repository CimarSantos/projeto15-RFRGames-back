import express from "express";
import cors from "cors";
import { userRouter } from "./routes/userRouter.js";
import { authRouter } from "./routes/authRouter.js";
import cartRouter from './routes/cartRouter.js';
import saledRouter from "./routes/saledRouter.js";
import dotenv from 'dotenv';
dotenv.config(); 

const server = express();
server.use(express.json());
server.use(cors());

server.use(userRouter);
server.use(authRouter);
server.use(cartRouter);
server.use(saledRouter);

server.listen(process.env.PORT, () => {
  console.log(`Server is listening on port 5000`);
});
