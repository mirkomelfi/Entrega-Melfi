import { ManagerMongoDB } from "../../../db/ManagerMongoDB.js";
import { Schema,model } from "mongoose";
import paginate  from "mongoose-paginate-v2";

const url = process.env.URLMONGODB

const productSchema = new Schema({
    nombre: String,
    stock:Number,
    precio: Number
})

productSchema.plugin(paginate) 

export class ManagerProductMongoDB extends ManagerMongoDB {
    constructor() {
        super(url, "products", productSchema)
        //Aqui irian los atributos propios de la clase
    }
    //Aqui irian los metodos propios de la clase
}
