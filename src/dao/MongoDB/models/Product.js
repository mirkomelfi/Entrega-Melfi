import { ManagerMongoDB } from "../../../db/ManagerMongoDB.js";
import { Schema} from "mongoose";
import paginate  from "mongoose-paginate-v2";

const url = process.env.URLMONGODB

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
        index: true
    },
    status: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        index: true
    },
    thumbnails: []
})

productSchema.plugin(paginate) 

export class ManagerProductMongoDB extends ManagerMongoDB {
    constructor() {
        super(url, "products", productSchema)
        //Aqui irian los atributos propios de la clase
    }
    async getProducts(params){
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
