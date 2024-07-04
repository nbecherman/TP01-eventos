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


    async countLocalidades() { 
      try {
        var sql = "SELECT COUNT(*) FROM locations"
        const result = await this.DBClient.query(sql)
        return result.rows[0].count
      } catch (error) {
        return error;
      }
    }


    async getLocalidades(limit, offset) {
      let returnEntity = null; //??
      try {
          const sql = `SELECT * FROM locations ORDER BY id ASC LIMIT $1 OFFSET $2`;
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


  async getLocalidadById(id){
    let returnEnity=null;
    try{
        const sql="select * from locations where id=$1";
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


    // Método para obtener eventos de una ubicación específica con paginación
    async getEventLocationsByLocation(id, limit, offset) {
      let returnEntity = null;
      try {
          const sql = `SELECT * FROM event_locations WHERE id_location=$1 ORDER BY id ASC LIMIT $2 OFFSET $3`;
          const values = [id, limit, offset];
          const result = await this.DBClient.query(sql, values);

          if (result.rows.length > 0) {
              returnEntity = result.rows;
          }
      } catch (error) {
          console.log(error);
      }
      return returnEntity;
  }



    
    async getLocationByProvince(id){
      let returnEnity=null;
      try{
          const sql="select * from locations where id_province=$1";
          const values=[id];
          const result=await this.DBClient.query(sql,values);
          if(result.rows.length>0){
              returnEnity=result.rows;
          }
      }catch(error){
          console.log(error)
      }
      return returnEnity;
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