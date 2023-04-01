import { getManagerUsers } from "../dao/daoManager.js";
import { createHash } from "../utils/bcrypt.js";

const data = await getManagerUsers()
export const userManager = new data.ManagerUserMongoDB

export const createUser = async (req, res) => {
    res.send({ status: "success", message: "User Created" })
}