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

async function login(req, res) {
  const { user } = res.locals;

  try {
    const token = uuid();

    await db.collection(COLLECTION.SESSIONS).insertOne({
      userId: user._id,
      token,
    });

    delete user.password;
    delete user._id;

    return res.status(STATUS_CODE.OK).send({ ...user, token });
  } catch (err) {
    return res
      .status(STATUS_CODE.SERVER_ERROR)
      .send({ message: "Erro do servidor." });
  }
}

export { signUp, login };
