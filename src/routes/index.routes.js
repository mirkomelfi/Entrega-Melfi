import { Router } from "express";
import routerCart from "./cart.routes.js";
import routerProduct from "./products.routes.js";
import routerMessage from "./messages.routes.js";
import routerSession from "./session.routes.js";
import routerUser from "./user.routes.js";


const router= Router()

router.use("/messages", routerMessage)
router.use("/api/carts", routerCart)
router.use("/api/products", routerProduct)
router.use("/api/session", routerSession)
router.use("/user", routerUser)

export default router