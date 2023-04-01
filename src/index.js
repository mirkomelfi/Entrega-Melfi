import "dotenv/config"
import express from "express";
import { Server } from "socket.io";
import { getManagerMessages } from "./dao/daoManager.js";
import session from 'express-session'
import { __dirname } from "./path.js";
import { engine } from 'express-handlebars';
import * as path from 'path'
import router from "./routes/index.routes.js";
import MongoStore from "connect-mongo";
import initializePassport from "./config/passport.js";
import passport from "passport";


const app = express()

app.set("port", process.env.PORT || 5000)

const server = app.listen(app.get("port"), () => console.log(`Server on port ${app.get("port")}`))


app.use(express.json()) 
app.use(express.urlencoded({extended: true}))

app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.URLMONGODB,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 210
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

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

app.use("/", router)


