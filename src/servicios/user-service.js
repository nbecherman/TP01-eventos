//import { query } from "express";
//hacer repositorio
//UserRepository()
export class userService {
    autenticacionUser(username,password,token)
    {
      const bd = new UserRepository();
      const resultado =  bd.autenticacionUser(username, password, token);
      if(resultado.length > 0){
          return true;
      }
      return false;
  }
  


     registrarseUser(first_name,last_name,username,password)
    {
      const bd = new UserRepository();
      const resultado = bd.registrarseUser(first_name,last_name,username,password);
      if(resultado.length > 0){
          return false;
      }
      return true;
  }
}