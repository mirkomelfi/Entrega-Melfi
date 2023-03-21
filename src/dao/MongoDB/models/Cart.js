import { ManagerMongoDB } from "../../../db/ManagerMongoDB.js";
import { Schema } from "mongoose";

const url = process.env.URLMONGODB

const cartSchema = new Schema({
    cartNumber:{
        type: Number,
        unique: true
    } ,
    products: Array
})

export class ManagerCartMongoDB extends ManagerMongoDB {
    constructor() {
        super(url, "carts", cartSchema)
        
        //Aqui irian los atributos propios de la clase
    }
     
    async getCarts (){
        this.setConnection()
        try{
            return await this.model.find()
        }catch(error){
            return error
        }
    }
    async addProductToCart(carts,idCart,idProd){
        console.log(carts)
        if (carts.some(cart=>cart.id===idCart)){
            let index= carts.findIndex((cart)=>cart.id===idCart) 
            let arrayProductos= carts[index].products
            console.log(arrayProductos)
            if (arrayProductos.some(prod=>prod._id===idProd)){
                const producto= arrayProductos.find(prod=>prod.product===idProd)
                producto.quantity++
            }else{
                let product={
                    product: idProd,
                    quantity:1
                }
                carts[index].products.push(product)
            }
            carts.forEach(cart => {
                if (cart.id===idCart){
                    const cartUpdated=cart
                }
            return cartUpdated
            });
        }else{
            return -1
        }
    }
}

