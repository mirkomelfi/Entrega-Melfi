import { Router } from "express";
import routerCart from "./cart.routes.js";
import routerProduct from "./products.routes.js";
import routerMessage from "./messages.routes.js";
import routerSession from "./session.routes.js";
import routerUser from "./user.routes.js";
import routerGithub from "./github.routes.js";
import routerPoliticas from "./politicas.routes.js";

const router= Router()

router.use("/messages", routerMessage)
router.use("/api/carts", routerCart)
router.use("/api/products", routerProduct)
router.use("/api/session", routerSession)
router.use('/authSession', routerGithub)
router.use("/user", routerUser)
router.use('*', (req, res) => {
    res.status(404).send({ error: "404 No se encuentra la pagina solicitada" })
})
router.use("/politicas",routerPoliticas)

export default router