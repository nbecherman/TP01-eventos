import jwt from "jsonwebtoken"
import "dotenv/config"

export default async function (token){
var payloadOriginal = null;
try {
    payloadOriginal = jwt.verify(token, process.env.SECRET_KEY);
} catch (error) {
    return null;
}
    return payloadOriginal
}