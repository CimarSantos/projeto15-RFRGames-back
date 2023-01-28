import joi from "joi";

export const saledSchema = joi.object({
    id: joi.string().required(),
    cardNumber: joi.string().required(), 
    cardPassword: joi.string().required() , 
    products: joi.array().required() 
})