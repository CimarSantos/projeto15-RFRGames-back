import { db } from "../database/db.js";
import { COLLECTION } from "../enums/collections.js";
import { STATUS_CODE } from "../enums/statusCode.js";

export async function saledPostValidation(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    try {

        if (!token) return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
        const user = await db.collection(COLLECTION.SESSION).findOne({ token }).toArray(); 
        if (!user) return res.sendStatus(STATUS_CODE.NOT_FOUND);

        res.locals.user = user;

        next(); 
        
    } catch (error) {
        console.log(error);
        return res.status(STATUS_CODE.SERVER_ERROR).send(error);
    }
}