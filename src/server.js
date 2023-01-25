import express from "express";
import cors from "cors";

const server = express();
server.use(express.json());
server.use(cors());

server.get("/", async (req, res) => {
  const actionGames = await db.collection("actionGames").find();
  res.send(actionGames);
});

server.listen(process.env.PORT, () => {
  console.log(`Server is listening on port 5000`);
});
