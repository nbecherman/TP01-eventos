import pg from "pg";
import { DBConfig } from "./db.js";
export default class userRepository
{
    constructor()
    {
        const {Client} = pg;
        this.DBClient = new Client(DBConfig);
        this.DBClient.connect();
    }
    async getUserByName(user,pass){
        let returnEnity=null;
        try{
            const sql="SELECT * FROM users where username=$1 and password=$2";
            const values=[user,pass];
            const result=await this.DBClient.query(sql,values);
            if(result.rows.length>0){
                returnEnity=result.rows[0];
            }

        }catch(error){
            console.log(error)
        }
        return returnEnity;
    }

    async registrarse(first_name,last_name,username,password){
        let returnEnity=null;
        try{
            const sql="INSERT INTO users(first_name,last_name,username,password) VALUES($1,$2,$3,$4)";
            const values=[first_name,last_name,username,password];
            const result=await this.DBClient.query(sql,values);
            if(result.rows.length>0){
                returnEnity=result.rows[0];
            }

        }catch(error){
            console.log(error)
        }
        return returnEnity;
    }
}