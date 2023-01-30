import { STATUS_CODE } from "../enums/statusCode.js";

export function validateSchema(schema) {

    return (req, res, next) => {

        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            console.log(error);
            return res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send(error.details.map(err => err.message));
        }
        next();
    };
};