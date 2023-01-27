import { signUpSchema, loginSchema } from "../schemas/schema.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import { COLLECTION } from "../enums/collections.js";
import { db } from "../database/db.js";

function validadeSignUp(req, res, next) {
  const user = req.body;
  const { error } = signUpSchema.validate(user, { abortEarly: false });

  if (error) {
    const message = error.details
      .map((detail) => detail.message)
      .join(",")
      .replace("[ref:password]", "equal to password");
    return res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send({ message });
  }
  res.locals.user = user;
  next();
}

async function thereIsUser(req, res, next) {
  const { user } = res.locals;
  const userExists = await db
    .collection(COLLECTION.USERS)
    .findOne({ email: user.email });
  if (userExists) {
    return res
      .status(STATUS_CODE.CONFLICT)
      .send({ message: "Usuário já cadastrado." });
  }
  next();
}

function validateLogin(req, res, next) {
  const { email, password } = req.body;
  const { error } = loginSchema.validate(
    { email, password },
    { abortEarly: false }
  );

  if (error) {
    const message = error.details
      .map((detail) => detail.message)
      .join(",")
      .replace("[ref:password]", "equal to password");
    return res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send({ message });
  }
  res.locals.info = { email, password };
  next();
}

export { validadeSignUp, validateLogin, thereIsUser };
