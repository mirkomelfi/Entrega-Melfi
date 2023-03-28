import { getManagerCarts } from "../dao/daoManager.js";

const data = await getManagerCarts()
const cartManager = new data.ManagerCartMongoDB


export const getCarts = async (req, res) => {
    try {
        const carritos = await cartManager.getCarts()

        if (carritos) {
            return res.status(200).json(carritos)
        }

        res.status(200).json({
            message: "Carritos no encontrados"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const getCartById = async (req, res) => {
    try {
        const cart=  await cartManager.getCartById(req.params.cid)

        if (cart) {
            return res.status(200).json(cart)
        }

        res.status(200).json({
            message: "Carrito no encontrado"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


export const addCart = async (req, res) => {
    try {
        const cart=  await cartManager.addElements([req.body])
        res.status(200).json({
            message: "Carrito actualizado"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


export const addProductCart = async (req, res) => {
    const {cid,pid}=req.params
    const {quantity=1}=req.query
    try {
        const cart= await cartManager.addProductCart(cid, pid, quantity)
        const cartUpdated= await cartManager.updateElement(cid,cart)
        res.status(200).json({
            message: "Carrito actualizado"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const addProductsCart = async (req, res) => {
    try {
        const cart= await cartManager.addProductsCart(req.params.cid,req.body)
        if (cart!==-1){
            const cartUpdated= await cartManager.updateElement(req.params.cid,cart)
            return res.status(204).json(cartUpdated)
        }
        res.status(200).json({
            message: "Carrito no encontrado"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


export const deleteProductCart = async (req, res) => {
    try {
        const cartUpdated= await cartManager.deleteProductCart(req.params.cid,req.params.pid)
        if (cartUpdated!==-1){
            await cartManager.updateElement(req.params.cid,cartUpdated)
            return res.status(200).json({
                message: "Producto eliminado"
            })
        }
        res.status(200).json({
            message: "Producto no encontrado"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


export const updateProductCart = async (req, res) => {
    const {quantity}=req.body
    try {
       const cartUpdated= await cartManager.updateProductCart(req.params.cid,req.params.pid,quantity)
       if (cartUpdated!==-1){
           await cartManager.updateElement(req.params.cid,cartUpdated)
           return res.status(200).json({
            message: "Producto actualizado"
            })
        }
        res.status(200).json({
            message: "Producto no encontrado"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}



export const deleteCart = async (req, res) => {
    try {
        const cart= await cartManager.deleteElementsCart(req.params.cid)
        if (cart!==-1){
            await cartManager.updateElement(req.params.cid,cart)
            return res.status(200).json({
                message: "Productos eliminados del carrito"
            })
        }
        res.status(200).json({
            message: "Carrito no encontrado"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}