import { Router } from "express";
import { ManagerCartMongoDB } from "../dao/MongoDB/models/Cart.js";

const routerMessage = Router()
const cartManager= new ManagerCartMongoDB()

const routerCart=Router()



export default routerCart