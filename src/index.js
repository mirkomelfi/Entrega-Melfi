import "dotenv/config"
import express from "express";
import { Server } from "socket.io";
import { getManagerMessages,getManagerProducts,getManagerCarts } from "./dao/daoManager.js";
import { __dirname } from "./path.js";
import { engine } from 'express-handlebars';
import * as path from 'path'
import routerMessage from "./routes/messages.routes.js";
import routerProduct from "./routes/products.routes.js";
import routerCart from "./routes/cart.routes.js";


const app = express()

app.set("port", process.env.PORT || 5000)

const server = app.listen(app.get("port"), () => console.log(`Server on port ${app.get("port")}`))


app.use(express.json()) 
app.use(express.urlencoded({extended: true}))
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views')); //__dirname + './views'


const io = new Server(server)


io.on("connection", async (socket) => {
    socket.on("message", async (info) => {
        const data = await getManagerMessages()
        const managerMessage = new data.ManagerMessageMongoDB
        managerMessage.addElements([info]).then(() => {
            managerMessage.getElements().then((mensajes) => {
                console.log(mensajes)
                socket.emmit("allMessages", mensajes)
            })
        })
    })
})


app.use('/', express.static(__dirname + '/public'))

app.use("/api/messages", routerMessage)
app.use("/api/carts", routerCart)
app.use("/api/products", routerProduct)


