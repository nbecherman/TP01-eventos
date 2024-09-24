import jwt from "jsonwebtoken"
import "dotenv/config"

export default async function (token){
var payloadOriginal = null;
try {
    payloadOriginal = jwt.verify(token, process.env.SECRET_KEY); //me da el id del token - payload de login
} catch (error) {
    return null;
}
    return payloadOriginal
}