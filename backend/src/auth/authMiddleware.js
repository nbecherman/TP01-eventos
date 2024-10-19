import DecryptToken from "../auth/jwt.js"

export default async function (req,res,next){
    if(!req.headers.authorization){ //si ingresaste el token en pm
        res.status(401).send("No tenes acceso a la informaccion");
    }else{
        const token =req.headers.authorization.split(' ')[1]; //le saco lo que no necesita
        const payload=await DecryptToken(token); //manda token a jwt que le devuelve el payload
        if(payload!=null){
            req.user=payload; //id del user por req
            next(); 
        }else{
            res.status(401).send("error en el token") ;
        }
    }
}

//verifica si hay token, si hay me obtiene el id de ese token