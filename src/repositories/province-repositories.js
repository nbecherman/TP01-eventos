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


    async cantidadProvinciasPag() { 
        try {
          var sql = "SELECT COUNT(*) FROM provinces"
          const result = await this.DBClient.query(sql)
          return result.rows[0].count
        } catch (error) {
          return error;
        }
      }
      async getProvincias(limit, offset){
        let returnEnity=null;
        try{
            const sql="select * from provinces limit $1 offset $2";
            const values = [limit,offset]
            const result=await this.DBClient.query(sql, values);
            if(result.rows.length>0){
                returnEnity=result.rows;
            }
        }catch(error){
            console.log(error)
        }
        return returnEnity;
    }

   
        async getProvinciaDetail(id){
            let returnEnity=null;
            try{
                const sql="select * from provinces where id=$1";
                const values=[id];
                const result=await this.DBClient.query(sql,values);
                if(result.rows.length>0){
                    returnEnity=result.rows[0];
                }
            }catch(error){
                console.log(error)
            }
            return returnEnity;
        }
    


    async createProvincia(provincia) {
        try {
            const sql = "INSERT INTO provinces (name, full_name, latitude, longitude, display_order) VALUES ($1, $2, $3, $4, null)"; 
            const values = [provincia.name, provincia.full_name, provincia.latitude, provincia.longitude];
            await this.DBClient.query(sql, values);
        } catch (error) {
          console.log(error);
        }
      }  

      async updateProvincia(provincia) {
        let returnEntity = null;
        let query = ''; 
    
            query = `
                UPDATE provinces
                SET `;
            
            const values = []; 
    
            const conditions = [];
            if (provincia.name) {
                conditions.push(`name = $${values.length + 1}`);
                values.push(provincia.name);
            }
            if (provincia.full_name) {
                conditions.push(`full_name = $${values.length + 1}`);
                values.push(provincia.full_name);
            }
            if (provincia.latitude) {
                conditions.push(`latitude = $${values.length + 1}`);
                values.push(provincia.latitude);
            }
            if (provincia.longitude) {
                conditions.push(`longitude = $${values.length + 1}`);
                values.push(provincia.longitude);
            }
            if (conditions.length > 0) {
                query += conditions.join(", ");
                query += ` WHERE id = $${values.length + 1}`; 
                values.push(provincia.id);
            }
            try {
                  const result = await this.DBClient.query(query, values);
                  if (result.rows.length > 0) {
                      returnEntity = result.rows;
                  }
              } catch (error) {
                  console.error("Error executing query:", error);
              }
              
    
        console.log("Query:", query);
        console.log("Values:", values);
        console.log("Result:", returnEntity);
        return returnEntity;
    
    }

            async deleteProvincia(id) {
                var returnEntity = null;
                try {
                  const sql = "DELETE FROM provinces WHERE id=$1";
                  const values = [id];
                  const result = await this.DBClient.query(sql, values);
            
                  if (result.rowsAffected.length > 0) {
                    returnEntity = result.rowsAffected[0];
                  }
                } catch (error) {
                  console.log(error);
                }
                return returnEntity;
              }  
}