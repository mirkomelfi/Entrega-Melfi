import { Router } from "express";
import { ManagerMessageMongoDB } from "../dao/MongoDB/models/Message.js";

const routerMessage = Router()
const messageManager= new ManagerMessageMongoDB()

// aun no implementado

export default routerMessage