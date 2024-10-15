import pg from "pg";
import { DBConfig } from "./db.js";
export default class eventLocationRepository
{
    constructor()
    {
        const {Client} = pg;
        this.DBClient = new Client(DBConfig);
        this.DBClient.connect();
    }
    
    async countEventLocations() { 
        try {
          var sql = "SELECT COUNT(*) FROM event_locations"
          const result = await this.DBClient.query(sql)
          return result.rows[0].count
        } catch (error) {
          return error;
        }
      }

      async getEventLocation(id) {
        let returnEntity = null;
        try {
            const sql = `SELECT * FROM event_locations WHERE id=$1`;
            const values = [id];
            const result = await this.DBClient.query(sql, values);
            if(result.rows.length>0){
                returnEntity=result.rows;
            }
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    async getEventLocationByUserSinPag(id,id_creator_user) {
        let returnEntity = null;
        try {
            const sql = `SELECT * FROM event_locations WHERE id_creator_user=$1 and id=$2`;
            const values = [id_creator_user,id];
            const result = await this.DBClient.query(sql, values);
            if(result.rows.length>0){
                returnEntity=result.rows;
            }
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }
    

    async getAllEventLocations() {
        let returnEntity = null;
        try {
            const sql = `SELECT * FROM event_locations`;
            const result = await this.DBClient.query(sql);
            if(result.rows.length>0){
                returnEntity=result.rows;
            }
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }
     // Obtiene todas las event-locations creadas por un usuario específico con paginación
    async getEventLocationsByUser(id_creator_user, limit, offset) {
        let returnEntity = null;
        try {
            const sql = `SELECT * FROM event_locations WHERE id_creator_user=$1 ORDER BY id ASC LIMIT $2 OFFSET $3`;
            const values = [id_creator_user, limit, offset];
            const result = await this.DBClient.query(sql, values);
            if(result.rows.length>0){
                returnEntity=result.rows;
            }
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    async getEventLocationsById(id_creator_user, id, limit, offset) {
        let returnEntity = null;
        try {
            const sql = `SELECT * FROM event_locations WHERE id_creator_user=$1 and id=$2 ORDER BY id ASC LIMIT $3 OFFSET $4`;
            const values = [id_creator_user,id,limit, offset];
            const result = await this.DBClient.query(sql, values);
            if(result.rows.length>0){
                returnEntity=result.rows;
            }
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    async insertEventLocation(eventLocation) {
        try {
            const sql = `INSERT INTO event_locations (id_location, name, full_address, max_capacity, latitude, longitude, id_creator_user) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
            const values = [eventLocation.id_location, eventLocation.name, eventLocation.full_address, eventLocation.max_capacity, eventLocation.latitude, eventLocation.longitude, eventLocation.id_creator_user];
            await this.DBClient.query(sql, values);
        } catch (error) {
            console.log(error);
        }
    }

    

    async UpdateEventLocation(eventLoc) {
        let returnEntity = null;
        let query = ''; 
    
            query = `
                UPDATE event_locations
                SET `;
            
            const values = []; 
    
            const conditions = [];
            if (eventLoc.id_location) {
                conditions.push(`id_location = $${values.length + 1}`);
                values.push(eventLoc.id_location);
            }
            if (eventLoc.name) {
                conditions.push(`name = $${values.length + 1}`);
                values.push(eventLoc.name);
            }
            if (eventLoc.full_address) {
                conditions.push(`full_address = $${values.length + 1}`);
                values.push(eventLoc.full_address);
            }
            if (eventLoc.max_capacity) {
                conditions.push(`max_capacity = $${values.length + 1}`);
                values.push(eventLoc.max_capacity);
            }
            if (eventLoc.latitude) {
                conditions.push(`latitude = $${values.length + 1}`);
                values.push(eventLoc.latitude);
            }
            if (eventLoc.longitude) {
                conditions.push(`longitude = $${values.length + 1}`);
                values.push(eventLoc.longitude);
            }
            if (conditions.length > 0) {
                query += conditions.join(", ");
                query += ` WHERE id = $${values.length + 1}`; 
                values.push(eventLoc.id);
            }
            try {
                  const result = await this.DBClient.query(query, values);
                  if (result.rowCount > 0) {
                      returnEntity = true;
                  }
              } catch (error) {
                  console.error("Error executing query:", error);
              }
              
    
        console.log("Query:", query);
        console.log("Values:", values);
        console.log("Result:", returnEntity);
        return returnEntity;
    
    }

    async deleteEventLocation(id) {
        try {
            const sql = `DELETE FROM event_locations WHERE id = $1`;
            const values = [id];
            await this.DBClient.query(sql, values);
        } catch (error) {
            console.log(error);
        }
    }
  
}