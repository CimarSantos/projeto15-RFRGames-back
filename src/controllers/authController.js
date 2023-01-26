import bcrypt from "bcrypt";
import { db } from "../database/db.js";
import { v4 as uuuid } from "uuid";
import { STATUS_CODE } from "../enums/statusCode.js";
import { COLLECTION } from "../enums/collections.js";

async function signUp(req, res) {
  const user = req.body;

  const passwordHash = bcrypt.hashSync(user.password, 10);

  try {
    delete user.confirmPassword;

    await db.collection(COLLECTION.USERS).insertOne({
      ...user,
      password: passwordHash,
    });

    return res
      .status(STATUS_CODE.CREATED)
      .send({ message: "Cadastro criado com sucesso!" });
  } catch (error) {
    return res
      .status(STATUS_CODE.SERVER_ERROR)
      .send({ message: "Ocorreu um erro no servidor." });
  }
}

export { signUp };
