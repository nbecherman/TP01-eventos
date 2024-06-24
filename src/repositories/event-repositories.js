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

    query()
    {
        const query = `
        SELECT 
            e.id, 
            e.name, 
            e.description, 
            json_build_object (
                'id', ec.id,
                'name', ec.name) 
                AS event_category,
            json_build_object (
                'id', el.id,
                'name', el.name,
                'full_address', el.full_address,
                'latitude', el.latitude,
                'longitude', el.longitude,
                'max_capacity', el.max_capacity,
                'location', json_build_object (
                    'id', l.id,
                    'name', l.name,
                    'latitude', l.latitude,
                    'longitude', l.longitude,
                    'max_capacity', el.max_capacity,
                    'province', json_build_object (
                        'id', p.id,
                        'name', p.name,
                        'full_name', p.full_name,
                        'latitude', p.latitude,
                        'longitude', p.longitude,
                        'display_order', p.display_order
                    )
                )
            ) AS event_location,
            e.start_date, 
            e.duration_in_minutes, 
            e.price, 
            e.enabled_for_enrollment, 
            e.max_assistance, 
            json_build_object (
                'id', u.id,
                'username', u.username,
                'first_name', u.first_name,
                'last_name', u.last_name
            ) AS creator_user,
            (
                SELECT json_agg(json_build_object('id', t.id, 'name', t.name))
                FROM event_tags et
                INNER JOIN tags t ON et.id_tag = t.id
                WHERE et.id_event = e.id
            ) AS tags
        FROM 
            events e 
        INNER JOIN 
            event_categories ec ON e.id_event_category = ec.id 
        LEFT JOIN 
            event_locations el ON e.id_event_location = el.id
        INNER JOIN
            locations l ON el.id_location = l.id
        INNER JOIN
            provinces p ON l.id_province = p.id
        INNER JOIN
            users u ON e.id_creator_user = u.id
        INNER JOIN 
            event_tags et on et.id_event = e.id
        INNER JOIN
            tags t on et.id_tag = t.id
        `;
        return query;
    }


    async cantidadEventosPag() { //revisar
      try {
        var sql = "SELECT COUNT(*) FROM events"
        const result = await this.BDclient.query(sql)
        return result.rows[0].count
      } catch (error) {
        return error;
      }
    }

    async getEventByFilter(Evento, limit, offset) {
        
        var query = `
          SELECT e.name, e.description, ec.name AS category, el.name AS location, e.start_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max_assistance 
          FROM events e
          INNER JOIN event_categories ec ON e.id_event_category = ec.id 
          INNER JOIN event_tags et ON e.id = et.id_event 
          INNER JOIN tags t ON et.id_tag = t.id 
          INNER JOIN locations el ON e.id_event_location = el.id 
          INNER JOIN users u ON e.id_creator_user = u.id 
      `;
      const conditions = [];
      const values = [];//valores de los parametros
      if (Evento.name) {
          conditions.push(`e.name =$${values.length + 1}`); 
          values.push(Evento.name);
      }
      if (Evento.category) {
          conditions.push(`ec.name =$${values.length + 1}`);
          values.push(Evento.category);
      }
      if (Evento.startDate) {
          conditions.push(`e.start_date =$${values.length + 1}`);
          values.push(Evento.startDate);
      }
      if (Evento.tag) {
          conditions.push(`t.name =$${values.length + 1}`);
          values.push(Evento.tag);
      }
  
      if (conditions.length > 0) { //si se agregaron condiciones
        query += " WHERE " + conditions.join(" AND "); //si hay las une con un AND
      }
     
      query += `
      GROUP BY e.id, e.name, e.description, ec.name, el.name, e.start_date, 
      e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max_assistance 
      ORDER BY e.id ASC 
      LIMIT $${values.length + 1} OFFSET $${values.length + 2}
  `;
      values.push(limit);
      values.push(offset * limit);
      
      console.log("Consulta SQL:", query); 
      console.log("Valores de los parámetros:", values); 
      try {
          const result = await this.DBClient.query(query, values);
          if ((result.rows.length > 0)) {
            return result.rows; //matriz con los resultados de la consulta
          }
      } catch (error) {
          console.error("Error en la consulta:", error);
      }
  }
  
      
    async getEventDetail(id) {
       const query = this.query() + " WHERE e.id = $1";
        let returnEntity = null;
        try {
          const values = [id];
          const result = await this.DBClient.query(query, values);
          if (result.rows.length > 0) {
            returnEntity = result.rows[0];
          }
        } catch (error) {
          console.log(error);
        }
        console.log(returnEntity);
        return returnEntity;
      }

      async getEventId(id) {
        const query = "SELECT * FROM events WHERE id = $1";
         let returnEntity = null;
         try {
           const values = [id];
           const result = await this.DBClient.query(query, values);
           if (result.rows.length > 0) {
             returnEntity = result.rows[0];
           }
         } catch (error) {
           console.log(error);
         }
         console.log(returnEntity);
         return returnEntity;
       }

      async getAllParticipantes(id, name, username, first_name, last_name, attended, rating) {
        let returnEntity = null;
        let query = `
            SELECT 
                er.id AS "id",
                er.id_event AS "id_event",
                er.id_user AS "id_user",
                json_build_object(
                    'id', u.id,
                    'first_name', u.first_name,
                    'last_name', u.last_name,
                    'username', u.username,
                    'password', '******'
                ) AS "user",
                er.description AS "description",
                er.registration_date_time AS "registration_date_time",
                er.attended AS "attended",
                er.observations AS "observations",
                er.rating AS "rating"
            FROM 
                event_enrollments er
            INNER JOIN 
                events e ON er.id_event = e.id
            INNER JOIN 
                users u ON u.id = er.id_user
            WHERE 
                e.id = $1
        `;
    
        const conditions = [];
        const values = [id];
    
        if (name) {
            conditions.push(`e.name = $${values.length + 1}`);
            values.push(name);
        }
        if (first_name) {
            conditions.push(`u.first_name = $${values.length + 1}`);
            values.push(first_name);
        }
        if (last_name) {
            conditions.push(`u.last_name = $${values.length + 1}`);
            values.push(last_name);
        }
        if (username) {
            conditions.push(`u.username = $${values.length + 1}`);
            values.push(username);
        }
        if (attended !== undefined) {
            conditions.push(`er.attended = $${values.length + 1}`);
            values.push(attended);
        }
        if (rating !== undefined) {
            conditions.push(`er.rating = $${values.length + 1}`);
            values.push(rating);
        }
    
        if (conditions.length > 0) {
            query += " AND " + conditions.join(" AND ");
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
    


      async createEvent(evento) {
        var returnEntity = null;
        try {
          const sql = `Insert into events(name,description,id_event_category,id_event_location,start_date,duration_in_minutes,price,enabled_for_enrollment,max_assistance,id_creator_user) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`;
          const values = [evento.name, evento.description, evento.id_event_category, evento.id_event_location, evento.start_date, evento.duration_in_minutes, evento.price, evento.enabled_for_enrollment, evento.max_assistance,evento.id_creator_user];
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
          const sql = `
          UPDATE events
          SET name = $2,
              description = $3,
              id_event_category = $4,
              id_event_location = $5,
              start_date = $6,
              duration_in_minutes = $7,
              price = $8,
              enabled_for_enrollment = $9,
              max_assistance = $10
          WHERE id = $1
        `;
        const values = [
          evento.id,
          evento.name,
          evento.description,
          evento.id_event_category,
          evento.id_event_location,
          evento.start_date,
          evento.duration_in_minutes,
          evento.price,
          evento.enabled_for_enrollment,
          evento.max_assistance
        ];
        const result = await this.DBClient.query(sql, values);
    
          if (result.rowsAffected.length > 0) {
            returnEntity = result.rowsAffected[0];
          }
        } catch (error) {
          console.log(error);
        }
        return returnEntity;
      }  

      async deleteEvent(idEvento) {
        var returnEntity = null;
        try {
          const sql = `DELETE FROM events WHERE id = $1`;
          const values = [idEvento];
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


    

}




    
      
    

