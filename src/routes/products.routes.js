import { Router } from "express";
import { productModel } from "../dao/MongoDB/models/Product.js";

const routerProduct=Router()

routerProduct.get("/", async (req,res)=> {
    try{
        let {limit}=req.query
        let {page}=req.query
        let {sort}=req.query
        let {query}=req.query
        if (sort==="1"||sort==="-1"){
            sort=parseInt(sort)
            const prueba=await productModel.aggregate([
                {
                    $sort:{precio:sort}   
                }/*,
                {
                    $group:{_id:1,products:{$push:"$$ROOT"}}
                },
                {
                    $project:{
                        "_id":0,
                        products:"$products"
                    }
                },
                {
                    merge:{
                        into:"prueba"
                    }
                }*/
            ])
            //const r2=await productModel.paginate({},{limit:2,page:1})
           // console.log(r2)
            res.send({rdo:"success",products:prueba})
        }else{
            const products=await productModel.find()
            res.send({rdo:"success",products:products})
        }
    
    }
    catch (error){
        res.send("error products",error.message)
    }
})

export default routerProduct