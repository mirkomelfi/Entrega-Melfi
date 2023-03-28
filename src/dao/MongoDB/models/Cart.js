import { ManagerMongoDB } from "../../../db/ManagerMongoDB.js";
import { Schema } from "mongoose";

const url = process.env.URLMONGODB

const cartSchema = new Schema({
    cartNumber:{
        type: Number,
        unique: true
    } ,
    
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'products'   
        },
        quantity: Number
    }],
    
})

export class ManagerCartMongoDB extends ManagerMongoDB {
    constructor() {
        super(url, "carts", cartSchema)
        
        //Aqui irian los atributos propios de la clase
    }
     
    async getCarts (){
        super.setConnection()
        try{
            return await this.model.find()
        }catch(error){
            return error
        }
    }

    async getCartById (id){
        super.setConnection()
        try{
            return await this.model.findById(id).populate("products.product")
        }catch(error){
            return error
        }
    }

    async addProductCart(idCart,idProduct,quantity){
        super.setConnection()
        const cart= await this.model.findById(idCart)
        const arrayProductos= cart.products

        if (arrayProductos.some(producto=>producto.product==idProduct)){
            const productWanted= arrayProductos.find(prod=>prod.product==idProduct)
            productWanted.quantity=productWanted.quantity+parseInt(quantity)
        }else{
            arrayProductos.push({product:idProduct,quantity:quantity})
        }

        cart.products=arrayProductos

        return cart
    }

    async addProductsCart(idCart,newArrayProducts){
        const cart= await this.model.findById(idCart)
        if(cart){
            cart.products=newArrayProducts
            return cart
        }
        return -1

    }

    async deleteProductCart(idCart,idProduct){
        //agregar logica si no existe el cart ingresado
        const cart= await this.model.findById(idCart)
        const arrayProductos= cart.products
        if (arrayProductos.some(producto=>producto.product==idProduct)){
            const arrayUpdated=arrayProductos.filter(producto=>producto.product!==idProduct)
            cart.products=arrayUpdated
            return cart
        }
        return -1
    }

    async updateProductCart(idCart,idProduct,newQuantity){
        const cart= await this.model.findById(idCart)
        const arrayProductos= cart.products
        if (arrayProductos.some(producto=>producto.product==idProduct)){
            const productWanted= arrayProductos.find(prod=>prod.product===idProduct)
            productWanted.quantity=newQuantity
            cart.products=arrayProductos
            return cart
        }
        return -1
    }

    async deleteElementsCart(idCart){
        const cart= await this.model.findById(idCart)
        if(cart){
            cart.products=[]
            return cart
        }
        return -1
    }

}

