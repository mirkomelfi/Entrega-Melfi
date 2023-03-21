import { Router } from "express";
import { ManagerCartMongoDB } from "../dao/MongoDB/models/Cart.js";

const routerCart = Router()
const cartManager= new ManagerCartMongoDB()

routerCart.get("/", async (req,res)=> {
    const carts=  await cartManager.getCarts()
    res.send({rdo:"success",carts:carts}) 
})

routerCart.get("/:cid", async (req,res)=> {
    const cart=  await cartManager.getElementById(req.params.cid)
    res.send({rdo:"success",cart:cart})
})

routerCart.post("/", async (req,res)=> {
    const mensaje=  await cartManager.addElements([req.body])
    res.send({rdo:"success",resultado:mensaje})
})

routerCart.post("/:cid/product/:pid", async (req,res)=> {
    const arrayCarts=  await cartManager.getCarts()
    console.log(arrayCarts)
    const cartUpdated= cartManager.addProductToCart(arrayCarts,req.params.cid,req.params.pid) // me lo actualiza en el codigo pero no en la BD
    if (cartUpdated!==-1){
        console.log("cartUpdated:", cartUpdated) // tmp funciona, no logro q me devuelva un objeto

        //const mensaje= await cartManager.updateElement(req.params.cid,cartsUpdated)
        res.send({rdo:"success",resultado:"cartUpdated[0]"})
    }else{
        res.send({rdo:"error",resultado:"Carrito no existe"})
    }
})

routerCart.delete("/:cid/product/:pid", async (req,res)=> {
   
})

routerCart.put("/:cid/", async (req,res)=> {
   
})

routerCart.put("/:cid/product/:pid", async (req,res)=> {
   
})

routerCart.delete("/:cid", async (req,res)=> {
   
})


export default routerCart