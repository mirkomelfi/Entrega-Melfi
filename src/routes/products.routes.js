import { Router } from "express";
import { addProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/product.controller.js";

const routerProduct=Router()

routerProduct.get("/", getProducts)
routerProduct.get("/:id", getProductById)
routerProduct.post("/", addProduct)
routerProduct.delete("/:id", deleteProduct)
routerProduct.put("/:id", updateProduct)

export default routerProduct