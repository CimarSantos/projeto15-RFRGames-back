import { ObjectId } from "mongodb";
import { db } from "../database/db.js";
import { COLLECTION } from "../enums/collections.js";
import { STATUS_CODE } from "../enums/statusCode.js";

async function getGames(req, res) {
  const { type } = req.params;
  try {
    const listGames = await db.collection(COLLECTION.GAMES).find().toArray();
    return res.status(STATUS_CODE.OK).send(listGames);
  } catch (error) {
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .send("Ocorreu um erro no servidor ao carregar a lista de jogos.");
  }
}

export { getGames };
