import express from "express";
import cors from "cors";
import { userRouter } from "./routes/userRouter.js";
import { authRouter } from "./routes/authRouter.js";

const server = express();
server.use(express.json());
server.use(cors());

server.use(userRouter);
server.use(authRouter); 

server.listen(process.env.PORT, () => {
  console.log(`Server is listening on port 5000`);
});
