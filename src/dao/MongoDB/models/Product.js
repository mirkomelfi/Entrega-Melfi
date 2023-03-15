import { ManagerMongoDB } from "../../../db/ManagerMongoDB";
import { Schema } from "mongoose";

const url = process.env.URLMONGODB

const productSchema = new Schema({
    nombre: String,
    marca: String,
    descripcion: String,
    precio: String
})
export class ManagerProductMongoDB extends ManagerMongoDB {
    constructor() {
        super(url, "products", productSchema)
        //Aqui irian los atributos propios de la clase
    }
    //Aqui irian los metodos propios de la clase
}