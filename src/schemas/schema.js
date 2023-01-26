import Joi from "joi";

const signUpSchema = Joi.object()
  .keys({
    name: Joi.string().trim().required(),
    email: Joi.string().trim().email().required(),
    image: Joi.string().trim().required(),
    password: Joi.string().min(3).trim().required(),
    confirmPassword: Joi.ref("password"),
  })
  .with("password", "confirmPassword");

const loginSchema = Joi.object().keys({
  email: Joi.string().trim().email().required(),
  password: Joi.string().min(3).trim().required(),
});

export { signUpSchema, loginSchema };
