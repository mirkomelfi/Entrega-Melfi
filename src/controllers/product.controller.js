import { getManagerProducts } from "../dao/daoManager.js";

const data = await getManagerProducts()
const productManager = new data.ManagerProductMongoDB

export const getProducts = async (req, res) => {
    try {
        const products = await productManager.getProducts(req.query)
        if (products) {
            return res.status(200).json(products)
        }
        res.status(200).json({
            message: "Productos no encontrados"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const getProductById = async (req, res) => {
    const { id } = req.params
    try {
        const product = await productManager.getElementById(id)
        if (product) {
            return res.status(200).json(product)
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


export const addProduct = async (req, res) => {
    const {title,description,code,price,status,stock,category,thumbnails } = req.body
    try {
        const product = await productManager.addElements([{title,description,code,price,status,stock,category,thumbnails}])
        res.status(204).json(product)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


export const updateProduct = async (req, res) => {
    const { id } = req.params
    const { title,description,code,price,status,stock,category,thumbnails } = req.body
    try {
        const product = await productManager.updateElement(id, {title,description,code,price,status,stock,category,thumbnails})

        if (product) {
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

export const deleteProduct = async (req, res) => {
    try {
        const product = await productManager.deleteElement(req.params.id)
        if (product) {
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