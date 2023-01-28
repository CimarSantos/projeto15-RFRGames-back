import express from "express";
import cors from "cors";
import { userRouter } from "./routes/userRouter.js";
import { authRouter } from "./routes/authRouter.js";
import cartRouter from './routes/cartRouter.js';

const server = express();
server.use(express.json());
server.use(cors());

server.use(userRouter);
server.use(authRouter); 
server.use(cartRouter);

server.listen(process.env.PORT, () => {
  console.log(`Server is listening on port 5000`);
});
