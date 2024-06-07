import jwt from "jsonwebtoken"
import "dotenv/config"

export default async function (Usuario){
    const options={
    expiresIn:"3h",
    issuer:"Reifut_Becher"
}   
    const payload = {"id":Usuario.id}
    console.log(typeof payload);
    const token=jwt.sign(payload,process.env.SECRET_KEY,options);
    return token; 

}