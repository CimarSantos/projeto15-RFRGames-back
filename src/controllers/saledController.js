import { db } from "../database/db.js";
import { COLLECTION } from "../enums/collections.js";
import { STATUS_CODE } from "../enums/statusCode.js";

export async function postSaled(req, res) {
    const { id, cardNumber, cardPassword, products } = req.body; 

    try {

        await db.collection(COLLECTION.SALED).insertOne({ idUser: id, cardNumber, cardPassword, itens: [ products ] });
        return res.sendStatus(STATUS_CODE.CREATED);
        
    } catch (error) {
        console.log(error)
        return res.status(STATUS_CODE.SERVER_ERROR).send(error)
    }
}