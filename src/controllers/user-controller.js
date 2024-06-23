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
      "message":"Logueado correctamente",
      "token":token});
    }else{
      return response.status(401).json({
        "succes":false,
        "message":"Logueado correctamente",
        "token":""});
    }
  } catch (error) {
    return response.json(error);
  }
});

export default router;
