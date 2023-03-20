import { Router } from "express";
import { ManagerProductMongoDB } from "../dao/MongoDB/models/Product.js";

const routerProduct=Router()
const productManager= new ManagerProductMongoDB()


routerProduct.get('/', async (req, res) => { 
    const products = await productManager.getElements(req.query)
    res.send({rdo:"success",products:products})
})

routerProduct.get('/:id', async (req, res) => { 
    const product = await productManager.getElementById(req.params.id)
    res.send({rdo:"success",product:product})
})

routerProduct.post('/', async (req, res) => { 
    let mensaje = await productManager.addElements([req.body])
    res.send(mensaje)
})
  
routerProduct.delete('/:id', async (req, res) => {
    let mensaje = await productManager.deleteElement(req.params.id) 
    res.send(mensaje)
})
  
routerProduct.put('/:id', async (req, res) => { 
    let mensaje = await productManager.updateElement(req.params.id, req.body)
    res.send(mensaje)
})







/*
routerProduct.get("/", async (req,res)=> {
    try{
        let {limit}=req.query
        let {page}=req.query
        let {sort}=req.query
        let {query}=req.query
        if (sort==="1"||sort==="-1"){
            sort=parseInt(sort)
            const prueba=await productManager.aggregate([
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
                }
            ])
            //const r2=await productModel.paginate({},{limit:2,page:1})
           // console.log(r2)
            res.send({rdo:"success",products:prueba})
        }else{
            const products=await productManager.getElements()
            res.send({rdo:"success",products:products})
        }
    
    }
    catch (error){
        res.send("error products",error.message)
    }
})
*/
export default routerProduct