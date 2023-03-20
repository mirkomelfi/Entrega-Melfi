import { Router } from "express";
import { ManagerMessageMongoDB } from "../dao/MongoDB/models/Message.js";

const routerMessage = Router()
const messageManager= new ManagerMessageMongoDB()

routerMessage.get('/', async (req, res) => { 
    const messages = await messageManager.getElements()
    console.log(messages)
    res.send(JSON.stringify(messages))
})

routerMessage.get('/:id', async (req, res) => { 
    const message = await messageManager.getElementById(req.params.id)
    console.log(message)
    res.send(JSON.stringify(message))
})

routerMessage.post('/', async (req, res) => { 
    let mensaje = await messageManager.addElements([req.body])
    res.send(mensaje)
})
  
routerMessage.delete('/:id', async (req, res) => {
    let mensaje = await messageManager.deleteElement(req.params.id) 
    res.send(mensaje)
})
  
routerMessage.put('/:id', async (req, res) => { 
    let mensaje = await messageManager.updateElement(req.params.id, req.body)
    res.send(mensaje)
})

export default routerMessage