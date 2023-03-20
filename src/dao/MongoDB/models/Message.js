import { ManagerMongoDB } from "../../../db/ManagerMongoDB";
import { Schema } from "mongoose";

const url = process.env.URLMONGODB

//const messageCollection="messages"

const messageSchema = new Schema({
    nombre: String,
    email: {
        type: String,
        unique: true
    },
    message: String
})

//export const messageModel=model(messageCollection,messageSchema)

export class ManagerMessageMongoDB extends ManagerMongoDB {
    constructor() {
        super(url, "messages", messageSchema)
        //Aqui irian los atributos propios de la clase
    }
    //Aqui irian los metodos propios de la clase
}

