import { ObjectId } from 'mongodb';
import { db } from '../database/db.js';
import { COLLECTION } from '../enums/collections.js';
import { STATUS_CODE } from '../enums/statusCode.js';

export async function getCart(req, res) {
    const user = res.locals.user;

    try {

        const myCart = await db.collection(COLLECTION.CART).findMany({ idUser: ObjectId(user.userId) }).toArray();
        if (!myCart) return res.sendStatus(STATUS_CODE.NOT_FOUND);
        return res.status(STATUS_CODE.OK).send(myCart);

    } catch (error) {
        console.log(error);
        return res.status(STATUS_CODE.SERVER_ERROR).send(error);
    }
};
export async function deleteCart(req, res) {
    const user = res.locals.user;
    const id = res.locals.id;

    try {

        await db.collection(COLLECTION.CART).deleteOne({ idUser: ObjectId(user.userId), _id: ObjectId(id) });

        return res.sendStatus(STATUS_CODE.OK);

    } catch (error) {
        console.log(error);
        return res.status(STATUS_CODE.SERVER_ERROR).send(error);
    }
}

export async function postCart(req, res) {
    const data = req.body;
    const { user } = res.locals.user;

    try {
        const Object = { user, data };
        await db.collection(COLLECTION.CART).insertOne(Object);
        res.sendStatus(STATUS_CODE.CREATED);
    }
    catch (error) {
        console.log(error);
        return res.send(error);
    }
}