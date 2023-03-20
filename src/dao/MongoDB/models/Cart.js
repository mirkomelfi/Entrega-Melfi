import { ManagerMongoDB } from "../../../db/ManagerMongoDB.js";
import { Schema } from "mongoose";

const url = "mongodb+srv://admin:coderhouse@cluster0.gis7zph.mongodb.net/?retryWrites=true&w=majority" //  process.env.URLMONGODB

const cartSchema = new Schema({
    products:[], //creo
})

export class ManagerProductMongoDB extends ManagerMongoDB {
    constructor() {
        super(url, "carts", cartSchema)
        //Aqui irian los atributos propios de la clase
    }
    //Aqui irian los metodos propios de la clase
}

