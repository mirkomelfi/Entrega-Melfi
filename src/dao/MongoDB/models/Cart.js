import { ManagerMongoDB } from "../../../db/ManagerMongoDB.js";
import { Schema } from "mongoose";

const url = process.env.URLMONGODB

const cartSchema = new Schema({
    products:[], // no se si esto va abajo o en el constructor
})

export class ManagerCartMongoDB extends ManagerMongoDB {
    constructor() {
        super(url, "carts", cartSchema)
        this.cart=[] // o aca
        //Aqui irian los atributos propios de la clase
    }
    addElementToCart(carts,idCart,idProd){
        if (carts.some(cart=>cart.id===idCart)){
            let index= aux.findIndex((cart)=>cart.id===idCart) 
            let arrayProductos= carts[index].products
            if (arrayProductos.some(prod=>prod.product===idProd)){
                const producto= arrayProductos.find(prod=>prod.product===idProd)
                producto.quantity++
            }else{
                let product={
                    product: idProd,
                    quantity:1
                }
                carts[index].products.push(product)
            }

            //fs.writeFileSync(this.path,JSON.stringify(aux))
            return "Producto añadido al carrito"
        }else{
            return "Carrito no existe"
        }
    }
}

