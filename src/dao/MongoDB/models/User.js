import { ManagerMongoDB } from "../../../db/ManagerMongoDB.js";
import { Schema } from "mongoose";

const url = process.env.URLMONGODB

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        index: true
    },
    age: {
        type: Number,
        required: true
    },
    rol: {
        type: String,
        default: "User"
    },
    password: {
        type: String,
        required: true
    }
})

export class ManagerUserMongoDB extends ManagerMongoDB {
    constructor() {
        super(url, "users", userSchema)

    }

    async getElementByEmail(email) {
        super.setConnection()
        try {
            return await this.model.findOne({ email: email })
        } catch (error) {
            return error
        }
    }

}