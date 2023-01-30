import bcrypt from "bcrypt";
import { db } from "../database/db.js";
import { v4 as uuid } from "uuid";
import { STATUS_CODE } from "../enums/statusCode.js";
import { COLLECTION } from "../enums/collections.js";

async function signUp(req, res) {
  const user = req.body;
  console.log(user);

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
  const { password } = req.body;
  const { user } = res.locals;

  try {

    if (user && bcrypt.compareSync(password, user.password)) {

      await db.collection(COLLECTION.SESSION).deleteMany({ userId: user._id });

      const token = uuid();
      
      await db.collection(COLLECTION.SESSION).insertOne({
        userId: user._id,
        token,
      });
      
      delete user.password;
      delete user._id;

      console.log('error no login authController.js')
      return res.status(STATUS_CODE.OK).send({ ...user, token });
    
    } else {
      console.log('error no login authController.js')    
      return res.status(STATUS_CODE.SERVER_ERROR).send('Usuário não encontrado. Email ou senha incorretos.')
    
    }

  } catch (err) {
    console.log(err)
    return res
      .status(STATUS_CODE.SERVER_ERROR)
      .send(err);
  }
}

export { signUp, login };
