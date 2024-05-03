import pkg from "pg";
import { DBConfig } from "../db.js"




const provincerepository = new provinceRepository();

export default class provinceRepository
{
    constructor()
    {
        const {Client} = pkg;
        this.DBClient = new Client(DBConfig);
        this.DBClient.connect();
    }



async getProvinceByIdAsync(id){
let returnEntity = null;

try{
    const sql = "SELECT * from provinces p WHERE p.id = $1"
    const values = [id]
    const result = await this.DBClient.query(sql, values); //result tiene dos variables. las rows- 03-08
    if(result.row.lenght > 0)
    {
    returnEntity = result.rows[0];
    }
}
catch(error)
{
    console.log(error)
}
return returnEntity
}

}