import express from "express";
import userService from "../servicios/user-service.js";
//import { AuthMiddleware } from "../auth/authMiddleware.js";

const UserService = new userService();

const router = express.Router();

router.post("/login", async (request, response) => { //terminado (:
  const user = request.body.username;
  const pass = request.body.password;
  try {
    const token = await UserService.login(user, pass);

    if(token!="Usuario o Contraseña no existen"){
    return response.status(200).json({
      "succes":true,
      "message":"",
      "token":token});
    }else{
      return response.status(401).json({
        "succes":false,
        "message":"Usuario o clave invalida",
        "token":""});
    }
  } catch (error) {
    return response.json(error);
  }
});

router.post("/register" , async (request,response) => 
{
const first_name = request.body.first_name
const last_name = request.body.last_name
const username = request.body.username
const password = request.body.password
const usernameRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
try {
if (first_name && last_name && username && password) {
  if (usernameRegex.test(username))
  {
    if (first_name.length > 3 && last_name.length > 3) {
      if (password.length>3) 
      {
        const registrar = await UserService.register(first_name,last_name,username,password);
        return response.status(201).json(registrar);
      }
      else
      {
        return response.status(400).send("La password tiene menos de 3 letras")
      }
    }
    else
    {
      return response.status(400).send("El firstname o lastname tiene menos de 3 letras")
    }
  }
  else
  {
    return response.status(400).send("El username es invalido")
  }
}
else
{
  return response.status(400).send("Hay un campo vacio")
}
} catch (error) {
  console.log(error);
  return res.json(error);
}
})
export default router;
