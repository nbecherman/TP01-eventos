import pg from "pg";
import { DBConfig } from "./db.js";


export default class provinceRepository
{
    constructor()
    {
        const {Client} = pg;
        this.DBClient = new Client(DBConfig);
        this.DBClient.connect();
    }

    async getAllProvincias(limit, offset) {
        const sql = "SELECT * FROM provinces limit = $1 offset = $2";
        const values = [limit, offset];
        return await this.DBClient.query(sql, values);
    }

    async createProvincia(provincia) {
        const sql = "INSERT INTO provinces (name, full_name, latitude, longitude, display_order) VALUES ($1, $2, $3, $4, $5)"; 
        const values = [provincia.name, provincia.full_name, provincia.latitude, provincia.longitude, provincia.display_order];
        const result = await this.DBClient.query(sql, values);
        return result.rows;
    }

    async deleteProvincia(id) {
        const sql = "DELETE FROM provinces WHERE id = $1";
        const values = [id];
        return await this.DBClient.query(sql,values);
    }

    async updateProvincia(id, provincia) {
        const sql = "UPDATE provinces SET(name = $1, full_name = $2 , latitude = $3, longitude = $4, display_order = $5) WHERE id = $6";
        const values = [provincia.name, provincia.full_name, provincia.latitude, provincia.longitude, provincia.display_order, id];
        return await this.DBClient.query(sql,values);
    }

    async getProvinciaDetail(id){
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