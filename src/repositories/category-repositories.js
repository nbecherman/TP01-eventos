import pg from "pg";
import { DBConfig } from "./db.js";
export default class categoryRepository
{
    constructor()
    {
        const {Client} = pg;
        this.DBClient = new Client(DBConfig);
        this.DBClient.connect();
    }
    async cantidadCategorias() { 
        try {
          var sql = "SELECT COUNT(*) FROM event_categories"
          const result = await this.DBClient.query(sql)
          return result.rows[0].count
        } catch (error) {
          return error;
        }
      }
    async getAllCategorias(limit, offset) {
        let returnEntity = null; 
        try {
            const sql = `SELECT * FROM event_categories ORDER BY id ASC LIMIT $1 OFFSET $2`;
            const values = [limit, offset];
            const result = await this.DBClient.query(sql, values);
            if (result.rows.length > 0) {
                returnEntity = result.rows;
            }
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    
      // Método para obtener una categoría por su ID
        async getCategoriaByID(id){
            let returnEnity=null;
            try{
                const sql="SELECT * FROM event_categories WHERE id = $1";
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

        async insertCategory(Categoria) {
            try {
                const sql = "INSERT INTO event_categories (name, display_order) VALUES ($1, $2)"; 
                const values = [Categoria.name, Categoria.display_order];
                await this.DBClient.query(sql, values);
            } catch (error) {
              console.log(error);
            }
          }  
    
}