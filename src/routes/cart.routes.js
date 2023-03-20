import { Router } from "express";
import { ManagerCartMongoDB } from "../dao/MongoDB/models/Cart.js";

const routerCart = Router()
const cartManager= new ManagerCartMongoDB()

routerCart.get("/", async (req,res)=> {
    const carts=  await cartManager.getElements()
    res.send({rdo:"success",carts:carts})
})

routerCart.get("/:cid", async (req,res)=> {
    const cart=  await cartManager.getElementById(req.params.cid)
    res.send({rdo:"success",cart:cart})
})

routerCart.post("/:cid/product/:pid", async (req,res)=> {
    const arrayCarts=  await cartManager.getElements()
    const mensaje= cartManager.addElementToCart(arrayCarts,req.params.cid,req.params.pid)
    res.send({rdo:"success",resultado:mensaje})
})

export default routerCart