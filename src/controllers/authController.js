import bcrypt from "bcrypt";
import { db } from "../database/db.js";
import { v4 as uuid } from "uuid";
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
      .send("Cadastro criado com sucesso!");
  } catch (error) {
    console.log(error)
    return res
      .status(STATUS_CODE.SERVER_ERROR)
      .send("Ocorreu um erro no servidor.");
  }
}

async function login(req, res) {
  const { password } = req.body;
  const user = res.locals.user;

  console.log('user do login', user)


  try {

    await db.collection(COLLECTION.SESSION).deleteMany({ userId: user._id });

    if (user && bcrypt.compareSync(password, user.password)) {

      const token = uuid();

      await db.collection(COLLECTION.SESSION).insertOne({
        userId: user._id,
        token,
      });

      console.log('user sendo enviado pro front', user)

      return res.status(STATUS_CODE.OK).send({ ...user , token });

    } 

  } catch (err) {
    console.log(err)
    return res
      .status(STATUS_CODE.SERVER_ERROR)
      .send(err);
  }
}

export { signUp, login };
