import express, { request } from "express";
import { userService,userService1 } from "../servicios/user-service.js";

const UserService = new userService();
const UserService1 = new userService1();

const router = express.Router();

      

router.post("/login",(request,response) =>{
  
  //hacerlo con body
  const body = request.body; 
  
  const username = request.query.username;
  const password = request.query.password;

  const crypto = require('crypto');
  const token = crypto.randomBytes(64).toString('hex');
  const loginToken = UserService.postAutenticacionUser("nico","contra","n1123")
  console.log(body);

  return response.json(loginToken);   

    });

    router.post("/register",(request,response) =>{
      
      //hacerlo con body
      const body = request.body; 
  
      const first_name = request.query.first_name;
      const last_name = request.query.last_name;
      const username = request.query.username;
      const password = request.query.password;
      
      const registerUser = UserService1.postRegistrarseUser("nicolas","reif","nrei","n1123")
      return response.json(registerUser);   
      });
  
export default router;
