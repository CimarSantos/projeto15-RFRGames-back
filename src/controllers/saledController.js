import { ObjectId } from "mongodb";
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
export async function deleteSaled(req, res) {
    const { authorization } = req.headers; 
    const token = authorization?.replace('Bearer ','');

    try {

        const user = await db.collection(COLLECTION.SESSION).find({ token }).toArray(); 
        if (!user) return res.status(STATUS_CODE.NOT_FOUND).send('Usuário não encontrado')


        await db.collection(COLLECTION.CART).deleteMany({ userId: ObjectId(user.userId)})
        return res.status(STATUS_CODE.OK).send('Carrinho deletado!')
        
    } catch (error) {
        console.log(error)
    }
}