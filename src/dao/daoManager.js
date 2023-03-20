const eleccionBDD=1//process.env.DBSELECTION

export const getManagerMessages=async()=>{
    const modeloMensaje=eleccionBDD===1 ? await import("./MongoDB/models/Message.js") : await import("./PostgresSQL/models/Message.js")
    return modeloMensaje
}

export const getManagerProducts=async()=>{
    const modeloMensaje=eleccionBDD===1 ? await import("./MongoDB/models/Product.js") : await import("./PostgresSQL/models/Product.js")
    return modeloMensaje
}

export const getManagerCarts=async()=>{
    const modeloMensaje=eleccionBDD===1 ? await import("./MongoDB/models/Cart.js") : await import("./PostgresSQL/models/Cart.js")
    return modeloMensaje
}