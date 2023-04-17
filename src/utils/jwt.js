import jwt from "jsonwebtoken"

export const generateToken = (user) => {
    const token = jwt.sign({ user }, process.env.COOKIE_SECRET, { expiresIn: '24h' })
    return token

}

export const authToken = (req, res, next) => {

    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).send({ error: "Usuario no autenticado" })
    }

    const token = authHeader.split(' ')[1]

    jwt.sign(token, process.env.COOKIE_SECRET, (error, credentials) => {

        if (error) {
            return res.status(403).send({ error: "Usuario no autorizado" })
        }

        req.user = credentials.user
        next()

    })
}