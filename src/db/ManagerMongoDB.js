import mongoose from "mongoose";

export class ManagerMongoDB{
    //#url
    constructor(url,collection,schema){
        //this.#url=url 
        this.url=url // por ahora lo deje public xq tengo q ver como hacerlo protected
        this.collection=collection
        this.schema=new mongoose.Schema(schema)
        this.model=mongoose.model(this.collection,this.schema)
    }
/*
    async #setConnection(){
        try{
            await mongoose.connect(this.#url)
            console.log("DB Connected")
        }catch(error){
            return error
        }
    }
*/

    async setConnection(){
        try{
            //await mongoose.connect(this.#url)
            await mongoose.connect(this.url)
            console.log("DB Connected")
        }catch(error){
            return error
        }
    }

    async addElements(elements){
        //this.#setConnection()
        this.setConnection()
        try{
            return await this.model.insertMany(elements)
        }catch(error){
            return error
        }
    }

    async getElements(){
        //this.#setConnection()
        this.setConnection()
        try{
            return await this.model.find()
        }catch(error){
            return error
        }
    }

    async getElementById(id){
        //this.#setConnection()
        this.setConnection()
        try{
            return await this.model.findById(id)
        }catch(error){
            return error
        }
    }

    async updateElement(id,info){
        //this.#setConnection()
        this.setConnection()
        try{
            return await this.model.findByIdAndUpdate(id,info)
        }catch(error){
            return error
        }
    }

    async deleteElement(id){
        //this.#setConnection()
        this.setConnection()
        try{
            return await this.model.findByIdAndDelete(id)
        }catch(error){
            return error
        }
    }
}