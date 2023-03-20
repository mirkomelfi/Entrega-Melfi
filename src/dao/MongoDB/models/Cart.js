import { ManagerMongoDB } from "../../../db/ManagerMongoDB.js";
import { Schema } from "mongoose";

const url = process.env.URLMONGODB

//const cartCollection="carts"

const cartSchema = new Schema({
    products:[], //creo
})

//export const cartModel=model(cartCollection,cartSchema)


export class ManagerProductMongoDB extends ManagerMongoDB {
    constructor() {
        super(url, "carts", cartSchema)
        //Aqui irian los atributos propios de la clase
    }
    //Aqui irian los metodos propios de la clase
}

