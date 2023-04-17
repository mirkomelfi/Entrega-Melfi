import { Router } from "express";
import { addCart, addProductCart, addProductsCart, deleteCart, deleteProductCart, getCartById, getCarts, updateProductCart } from "../controllers/cart.controller.js";


const routerCart = Router()

routerCart.get("/", getCarts)
routerCart.get("/:cid",getCartById)
routerCart.post("/:cid/product/:pid", addProductCart) 
routerCart.delete("/:cid/product/:pid",deleteProductCart)
routerCart.put("/:cid",addProductsCart)
routerCart.put("/:cid/product/:pid",updateProductCart)
routerCart.delete("/:cid",deleteCart)

export default routerCart