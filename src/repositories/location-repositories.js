import pg from 'pg';
import { DBConfig } from "./db.js";

export default class locationRepository
{
    
        constructor()
        {
            const {Client} = pg;
            this.DBClient = new Client(DBConfig);
            this.DBClient.connect();
        }
    
    async getEventLocationById(id){ //mal esto es en eventlocation
        let returnEntity = null;
      try {
        var sql = `SELECT * FROM event_locations WHERE id=$1`;
        const values = [id];
        const result = await this.DBClient.query(sql, values);

      if (result.rows.length > 0) {
        returnEntity = result.rows[0];
      }
        } catch (error) {
        console.log(error);
        }
        return returnEntity;
    }


    async getLocalidadesByProvincia(id,limit,offset){
      let returnEnity=null;
      try{
          const sql="select * from locations where id_province=$1 limit $2 offset $3";
          const values=[id,limit,offset];
          const result=await this.DBClient.query(sql,values);
          if(result.rows.length>0){
              returnEnity=result.rows;
          }
      }catch(error){
          console.log(error)
      }
      return returnEnity;
  }

}