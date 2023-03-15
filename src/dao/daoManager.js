const eleccionBDD=process.env.DBSELECTION

export const getManagerMessages=async()=>{
    const modeloMensaje=eleccionBDD===1 ? await import("") : await import("")
    return modeloMensaje
}