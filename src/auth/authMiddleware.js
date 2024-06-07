import DecryptToken from "../auth/jwt.js"

export default async function (req,res,next){
    if(!req.headers.authorization){
        res.status(401).send("Forbidden");
    }else{
        const token =req.headers.authorization.split(' ')[1];
        const payload=await DecryptToken(token);
        next();
    }
    }


    /*
    hacer middleware auth
    hacer paginacion 
    controllers,services,repos que faltan  event_locations event-location event-category
    los errores de los endpoints status
    ver tema querys
    */ 