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
    
    async getEventLocationById(id){
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

}