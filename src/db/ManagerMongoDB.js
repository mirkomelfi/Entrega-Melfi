import mongoose from "mongoose";
import { paginate } from "mongoose-paginate-v2";

export class ManagerMongoDB{
    //#url
    constructor(url,collection,schema){
        //this.#url=url 
        this.url=url // por ahora lo deje public xq tengo q ver como hacerlo protected
        this.collection=collection
        this.schema=new mongoose.Schema(schema)
        //this.schema.plugin(paginate)
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

    async getElements(params){
        //this.#setConnection()
        this.setConnection()
        try{
            let {limit,page,sort,query}=params
            if (sort==="1"||sort==="-1"){
                sort=parseInt(sort)
                const r1= this.model.aggregate([
                {
                    $sort:{precio:sort}   
                }
                ])
                
                //const r2= r1.paginate({}) // no me devuelve nada
                //console.log(r2) / no me devuelve nada
                return await r1
                
            }else{
                return await this.model.find()
            }
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