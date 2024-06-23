//import { query } from "express";
//hacer repositorio
//UserRepository()

import { query } from "express";

import userRepository from "../repositories/user-repositories.js"
import login from "../auth/login.js";
const UserRepository= new userRepository();

export default class userService {

     async login(user, pass) {
    try{
    const Usuario= await this.getUserByPayload(user,pass) //obtiene el nombre de usuario
    console.log(Usuario)
    if(Usuario!=null){
      const token =await login(Usuario) //mando para sacar el id
      return token;
    }else{
      return "Usuario o Contraseña no existen";
    }
    }catch(error){
      console.log(error);
      return res.json(error);
    }
}

async getUserByPayload(user,pass){
    return await UserRepository.getUserByName(user,pass) //obtengo el user

  }

}

