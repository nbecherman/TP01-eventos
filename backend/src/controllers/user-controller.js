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

router.post("/register", async (request, response) => {
  const { first_name, last_name, username, password } = request.body;
  
  const usernameRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  // Comprobar si hay campos vacíos
  if (!first_name || !last_name || !username || !password) {
      return response.status(400).send("Hay un campo vacío");
  }

  // Validar el nombre de usuario
  if (!usernameRegex.test(username)) {
      return response.status(400).send("El username es inválido");
  }

  // Validar longitudes
  if (first_name.length <= 3 || last_name.length <= 3) {
      return response.status(400).send("El firstname o lastname deben tener más de 3 letras");
  }

  if (password.length <= 3) {
      return response.status(400).send("La password debe tener más de 3 letras");
  }

  try {
      const registrar = await UserService.register(first_name, last_name, username, password);
      return response.status(201).json(registrar);
  } catch (error) {
      console.error(error);
      return response.status(500).send("Error en el servidor");
  }
});


export default router;
