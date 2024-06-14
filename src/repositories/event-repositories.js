import pg from 'pg';
import { DBConfig } from "./db.js";




export default class eventRepository
{
    constructor()
    {
        const {Client} = pg;
        this.DBClient = new Client(DBConfig);
        this.DBClient.connect();
    }


    async cantidadEventosPag() { //revisar
      var returnEntity = 0;
      try {
        var sql = "SELECT COUNT(*) FROM events"
        const result = await this.BDclient.query(sql)
        return result.rows[0].count
      } catch (error) {
        return error;
      }
    }

    async getEventByFilter(Evento, limit, offset) {
      let sql = `
          SELECT e.name, e.description, ec.name AS category, el.name AS location, e.start_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max_assistance 
          FROM events e
          INNER JOIN event_categories ec ON e.id_event_category = ec.id 
          INNER JOIN event_tags et ON e.id = et.id_event 
          INNER JOIN tags t ON et.id_tag = t.id 
          INNER JOIN locations el ON e.id_event_location = el.id 
          INNER JOIN users u ON e.id_creator_user = u.id 
      `;
      
      const conditions = [];//para aplicarle las condiciones del where
      const values = [];//valores de los parametros
  
      if (Evento.name) {
          conditions.push(`e.name ILIKE '%' || $${values.length + 1} || '%'`);
          values.push(Evento.name);
      }
      if (Evento.category) {
          conditions.push(`ec.name ILIKE '%' || $${values.length + 1} || '%'`);
          values.push(Evento.category);
      }
      if (Evento.startDate) {
          conditions.push(`e.start_date = $${values.length + 1}`);
          values.push(Evento.startDate);
      }
      if (Evento.tag) {
          conditions.push(`t.name ILIKE '%' || $${values.length + 1} || '%'`);
          values.push(Evento.tag);
      }
  
      if (conditions.length > 0) { //si se agregaron condiciones
          sql += " WHERE " + conditions.join(" AND "); //si hay las une con un AND
      }
  
      sql += " ORDER BY e.start_date DESC LIMIT $1 OFFSET $2"; 
      values.push(BigInt(limit));
      values.push(BigInt(offset));
      
      try {
          const result = await this.DBClient.query(sql, values);
          if ((result.rows.length > 0)) {
            return result.rows; //matriz con los resultados de la consulta
          }
      } catch (error) {
          console.error("Error en la consulta:", error);
      }
  }
  
      
    async getEventDetail(id) {
        let returnEntity = null;
        try {
          var sql = `SELECT e.name, e.description, ec.name as Category, el.name as Location, e.start_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max_assistance FROM events e inner join event_categories ec on e.id_event_category=ec.id inner join event_tags et on e.id=et.id_event inner join tags t on et.id_tag=t.id inner join locations el on e.id_event_location = el.id inner join users u on e.id_creator_user = u.id where e.id=$1`;
          const values = [id];
          const result = await this.DBClient.query(sql, values);
    
          if (result.rows.length > 0) {
            returnEntity = result.rows[0];
          }
        } catch (error) {
          console.log(error);
        }
        console.log(returnEntity);
        return returnEntity;
      }


      async getAllParticipantes(name,username, first_name, last_name, attended, rating) {
        let returnEntity = null;
        try {
          var sql = `select ev.id,ev.name, u.first_name, u.last_name, u.username, ee.atended, ee.rating from events ev inner join event_enrollments ee on ev.id=ee.id_event inner join on users u ev.id_user = u.id where ev.id=$7 and `;
    
          if (enrollment.nombreEv != null) {
            sql += ` ev.name=$1 and`;
          }
          if (enrollment.firstName != null) {
            sql += ` u.first_Name=$2 and`;
          }
          if (enrollment.lastName != null) {
            sql += ` u.last_name=$3 and`;
          }
          if (enrollment.username != null) {
            sql += ` u.username=$4 and`;
          }
          if (enrollment.attended != null) {
            sql += ` ee.attended=$5 and`;
          }
          if (enrollment.rating != null) {
            sql += ` ee.rating=$6 and`;
          }
          if (sql.endsWith(" and")) {
            sql = sql.slice(0, -4);
          }
          if (sql.endsWith(" and where")) {
            sql = sql.slice(0, -10);
          }
    
          const values = [name, first_name, last_name,username, attended, rating];
          const result = await this.DBClient.query(sql, values);
          if (result.rows.length > 0) {
            returnEntity = result.rows;
          }
        } catch (error) {
          console.log(error);
        }
    
        return returnEntity;
      }


      async createEvent(evento) {
        var returnEntity = null;
        try {
          const sql = `Insert into events(name,description,id_event_category,id_event_location,start_date,duration_in_minutes,price,enabled_for_enrollment,max__assistance) values ("1","$9","$2","$3","$4","$5,"$6","$7","$8")`;
          const values = [evento.name, evento.id_event_category, evento.id_event_location, evento.start_date, evento.duration_in_minutes, evento.price, evento.enabled_for_enrollment, evento.max_assistance, evento.description];
          const result = await this.DBClient.query(sql, values);
    
          if (result.rowsAffected.length > 0) {
            returnEntity = result.rowsAffected[0];
          }
        } catch (error) {
          console.log(error);
        }
        return returnEntity;
      }  

    
      async updateEvent(evento) { ////////////////
        var returnEntity = null;
        try {
          const sql = `Insert into events(name,description,id_event_category,id_event_location,start_date,duration_in_minutes,price,enabled_for_enrollment,max__assistance) values ("1","$9","$2","$3","$4","$5,"$6","$7","$8")`;
          const values = [evento.name, evento.id_event_category, evento.id_event_location, evento.start_date, evento.duration_in_minutes, evento.price, evento.enabled_for_enrollment, evento.max_assistance, evento.description];
          const result = await this.DBClient.query(sql, values);
    
          if (result.rowsAffected.length > 0) {
            returnEntity = result.rowsAffected[0];
          }
        } catch (error) {
          console.log(error);
        }
        return returnEntity;
      }  

      async UpdateRating(idEvento,rating) {
        var returnEntity = null;
        try {
          const sql = `update event_enrollments SET rating=$1 WHERE id=$2`;
          const values = [idEvento,rating];
          const result = await this.DBClient.query(sql, values);
    
          if (result.rowsAffected.length > 0) {
            returnEntity = result.rowsAffected[0];
          }
        } catch (error) {
          console.log(error);
        }
        return returnEntity;
      } 

      async InscripcionEvento(evento, users) { //terminar
        var returnEntity = null
        try {
          var sql = ""
          if (evento.enabled_for_enrollment) {
            sql = `Insert INTO event_enrollment (id_event, id_user, description, registration_date_time,attended,observations,rating) VALUES ($1,$2,$3,$4,$5,$6,$7)`;
          }else return returnEntity;
    
          const values = [evento.id, users.id,enrollment.description, Date.now(),enrollment.attended, enrollment.observations, enrollment.rating]
          const result = await this.DBClient.query(sql, values);
    
          if (result.rowsAffected.length > 0) {
            returnEntity = result.rowsAffected[0];
          }
        } catch (error) {
          console.log(error);
        }
        return returnEntity
      }
    

}




    
      
    

