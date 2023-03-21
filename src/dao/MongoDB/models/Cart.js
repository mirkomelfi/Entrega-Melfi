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

    async addProductCart(cart,idProduct){
        const arrayProductos= cart.products
        if (arrayProductos.some(producto=>producto.product==idProduct)){
            const productWanted= arrayProductos.find(prod=>prod.product===idProduct)
            productWanted.quantity++
        }else{
            arrayProductos.push({product:idProduct,quantity:1})
        }
        cart.products=arrayProductos
        return cart
    }

    async addProductsCart(cart,newArrayProducts){
        cart.products=newArrayProducts
        return cart
    }

    async deleteProductCart(cart,idProduct){
        const arrayProductos= cart.products
        if (arrayProductos.some(producto=>producto.product==idProduct)){
            const arrayUpdated=arrayProductos.filter(producto=>producto.product!==idProduct)
            cart.products=arrayUpdated
            return cart
        }
        return -1
    }

    async updateProductCart(cart,idProduct,newQuantity){
        const arrayProductos= cart.products
        if (arrayProductos.some(producto=>producto.product==idProduct)){
            const productWanted= arrayProductos.find(prod=>prod.product===idProduct)
            productWanted.quantity=newQuantity
            cart.products=arrayProductos
            return cart
        }
        return -1
    }

    async deleteElementsCart(cart){
        cart.products=[]
        return cart
    }


}

