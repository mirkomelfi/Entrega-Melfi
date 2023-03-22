import { Router } from "express";
import { ManagerCartMongoDB } from "../dao/MongoDB/models/Cart.js";

const routerCart = Router()
const cartManager= new ManagerCartMongoDB()

routerCart.get("/", async (req,res)=> {
    const carts=  await cartManager.getCarts()
    res.json({rdo:"success",carts:carts}) 
})

routerCart.get("/:cid", async (req,res)=> {
    const cart=  await cartManager.getElementById(req.params.cid)
    res.json({rdo:"success",cart:cart})

})

routerCart.post("/", async (req,res)=> {
    const mensaje=  await cartManager.addElements([req.body])
    res.json({rdo:"success",resultado:mensaje})
})

routerCart.post("/:cid/product/:pid", async (req,res)=> {
    const cart=  await cartManager.getElementById(req.params.cid)
    const cartUpdated= await cartManager.addProductCart(cart,req.params.pid)
    await cartManager.updateElement(req.params.cid,cartUpdated)
    res.json({rdo:"success",resultado:"Producto añadido al carrito"})
})

routerCart.delete("/:cid/product/:pid", async (req,res)=> {
    const cart=  await cartManager.getElementById(req.params.cid)
    const cartUpdated= await cartManager.deleteProductCart(cart,req.params.pid)
    if (cartUpdated!==-1){
        await cartManager.updateElement(req.params.cid,cartUpdated)
        res.json({rdo:"success",resultado:"Producto eliminado del carrito"})
    }else{
        res.json({rdo:"error",resultado:"Producto no se encuentra en el carrito seleccionado"})
    }
    
})

routerCart.put("/:cid", async (req,res)=> {
    const cart=  await cartManager.getElementById(req.params.cid)
    const cartUpdated= await cartManager.addProductsCart(cart,req.body)
    await cartManager.updateElement(req.params.cid,cartUpdated)
    res.json({rdo:"success",resultado:"Productos agregados al carrito"})
    
})

routerCart.put("/:cid/product/:pid", async (req,res)=> {
    const cart=  await cartManager.getElementById(req.params.cid)
    const quantity= req.body.quantity
    const cartUpdated= await cartManager.updateProductCart(cart,req.params.pid,quantity)
    if (cartUpdated!==-1){
        await cartManager.updateElement(req.params.cid,cartUpdated)
        res.json({rdo:"success",resultado:"Producto actualizado"})
    }else{
        res.json({rdo:"error",resultado:"Producto no se encuentra en el carrito seleccionado"})
    }

})

routerCart.delete("/:cid", async (req,res)=> {
    const cart=  await cartManager.getElementById(req.params.cid)
    const cartUpdated= await cartManager.deleteElementsCart(cart)
    await cartManager.updateElement(req.params.cid,cartUpdated)
    res.json({rdo:"success",resultado:"Productos eliminados del carrito"})
})


export default routerCart