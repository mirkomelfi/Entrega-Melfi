import { ManagerMongoDB } from "../../../db/ManagerMongoDB.js";
import { Schema} from "mongoose";
import paginate  from "mongoose-paginate-v2";

const url = process.env.URLMONGODB

const productSchema = new Schema({
    name: String,
    category:String,
    stock:Number,
    price: Number
})

productSchema.plugin(paginate) 

export class ManagerProductMongoDB extends ManagerMongoDB {
    constructor() {
        super(url, "products", productSchema)
        //Aqui irian los atributos propios de la clase
    }
    async getProducts(params){
        //this.#setConnection()
        super.setConnection()
        let {limit,page,sort,category}=params
        if (category){
            if (sort==="1"||sort==="-1"){
                return await this.model.paginate({category},{sort:{price:parseInt(sort)},limit:limit||10,page:page||1})
            }else{
                return await this.model.paginate({category},{limit:limit||10,page:page||1})
            }
        }else{
            if (sort==="1"||sort==="-1"){
                return await this.model.paginate({},{sort:{price:parseInt(sort)},limit:limit||10,page:page||1})
            }else{
                return await this.model.paginate({},{limit:limit||10,page:page||1})
            }
        }
    }
}
