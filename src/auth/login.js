import jwt from "jsonwebtoken"
import "dotenv/config"

export default async function (Usuario){ //recibe usuario
    const options={ //opciones del token
    expiresIn:"3h",
    issuer:"Reifut_Becher"
}   
    const payload = {"id":Usuario.id} //info del token, id del usuario PAYLOAD
    const token=jwt.sign(payload,process.env.SECRET_KEY,options); //lo que contiene el token
    return token; //obtengo el token
    }
