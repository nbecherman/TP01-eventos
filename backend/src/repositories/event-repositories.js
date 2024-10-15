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


    async cantidadEventosPag() { 
      try {
        var sql = "SELECT COUNT(*) FROM events"
        const result = await this.DBClient.query(sql)
        return result.rows[0].count
      } catch (error) {
        return error;
      }
    }

    async getEventByFilter(Evento, limit, offset) {
        
      var query =  `
      SELECT 
          e.id, 
          e.name, 
          e.description, 
          json_build_object (
              'id', ec.id,
              'name', ec.name
          ) AS event_category,
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
      GROUP BY 
          e.id,
          ec.id,
          el.id,
          l.id,
          p.id,
          u.id
      ORDER BY e.id ASC 
      LIMIT $${values.length + 1} OFFSET $${values.length + 2};
    `;
    
  
      values.push(limit);
      values.push(offset);
      
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
           console.log(result.rows.length)
           if (result.rows.length > 0) {
             returnEntity = result.rows[0];
           }
         } catch (error) {
           console.log(error);
         }
         console.log(returnEntity);
         return returnEntity;
       }

      async getAllParticipantes(Evento_Enrrolment) {
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
        const values = [Evento_Enrrolment.id];
    
        if (Evento_Enrrolment.name) {
            conditions.push(`e.name = $${values.length + 1}`);
            values.push(Evento_Enrrolment.name);
        }
        if (Evento_Enrrolment.first_name) {
            conditions.push(`u.first_name = $${values.length + 1}`);
            values.push(Evento_Enrrolment.first_name);
        }
        if (Evento_Enrrolment.last_name) {
            conditions.push(`u.last_name = $${values.length + 1}`);
            values.push(Evento_Enrrolment.last_name);
        }
        if (Evento_Enrrolment.username) {
            conditions.push(`u.username = $${values.length + 1}`);
            values.push(Evento_Enrrolment.username);
        }
        if (Evento_Enrrolment.attended) {
            conditions.push(`er.attended = $${values.length + 1}`);
            values.push(Evento_Enrrolment.attended);
        }
        if (Evento_Enrrolment.rating) {
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
      let returnEntity = null;
      const client = await this.DBClient.connect(); // Asegúrate de conectar al cliente
      try {  
          const sql = `INSERT INTO events(name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user) 
                       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`;
          const values = [
              evento.name,
              evento.description,
              evento.id_event_category,
              evento.id_event_location,
              evento.start_date,
              evento.duration_in_minutes,
              evento.price,
              evento.enabled_for_enrollment,
              evento.max_assistance,
              evento.id_creator_user
          ];
          const result = await client.query(sql, values);
          if (result.rows.length > 0) {
              returnEntity = result.rows[0];
              const tagSql = `INSERT INTO tags (id_event, id_tag) VALUES ($1, $2)`;
              const tagValues = [returnEntity.id_event, evento.id_tag]; 
              await client.query(tagSql, tagValues);
          }
      } catch (error) {
          console.log(error);
      } finally {
          client.release();
      }
      return returnEntity;
  }
  
async updateEvent(evento) {
    let returnEntity = null;
    let query = ''; 

        query = `
            UPDATE events
            SET `;
        
        const values = []; 

        const conditions = [];

        if (evento.name) {
            conditions.push(`name = $${values.length + 1}`);
            values.push(evento.name);
        }
        if (evento.description) {
            conditions.push(`description = $${values.length + 1}`);
            values.push(evento.description);
        }
        if (evento.duration_in_minutes) {
            conditions.push(`duration_in_minutes = $${values.length + 1}`);
            values.push(evento.duration_in_minutes);
        }
        if (evento.price) {
            conditions.push(`price = $${values.length + 1}`);
            values.push(evento.price);
        }
        if (evento.max_assistance) {
            conditions.push(`max_assistance = $${values.length + 1}`);
            values.push(evento.max_assistance);
        }

        if (conditions.length > 0) {
            query += conditions.join(", ");
            query += ` WHERE id = $${values.length + 1}`; 
            values.push(evento.id);
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

      async getTagsByEvent(id){
        var returnEntity=null
        try{
        const sql="SELECT * FROM event_tags WHERE id_event=$1"
        const values=[id]
        const result= await this.DBClient.query(sql,values)
        if (result.rows.length>0) {
          returnEntity=result.rows;
          
        }
        }catch(error){
          console.log(error);
        }
        return returnEntity;
        
      }

      async getEnrolmentsById(id){
        var returnEntity=null
        try{
        const sql="SELECT * FROM event_enrrolments WHERE id_event=$1"
        const values=[id]
        const result= await this.DBClient.query(sql,values)
        if (result.rows.length>0) {
          returnEntity=result.rows;
          
        }
        }catch(error){
          console.log(error);
        }
        return returnEntity;
        
      }



      async getInscriptosAlEvento(id)
      {
      var returnEntity=null
      try{
      const sql="SELECT id_event, COUNT(id_user) AS num_users FROM event_enrollments WHERE id_event = $1 GROUP BY id_event;"
      const values=[id]
      const result= await this.DBClient.query(sql,values)
      if (result.rows.length>0) {
        returnEntity=result.rows;
      }
      }catch(error){
        console.log(error);
      }
      return returnEntity;
       
      }

      async isUserRegistered(idEvento,idUser)
      {
      var returnEntity=null
      try{
      const sql = "SELECT COUNT(*) > 0 AS exists FROM event_enrollments WHERE id_user = $2 AND id_event = $1";
      const values=[idEvento,idUser]
      const result= await this.DBClient.query(sql,values)
      if (result.rows.length > 0) {
        returnEntity = result.rows[0].exists;
      }
      }catch(error){
        console.log(error);
      }
      return returnEntity;
       
      }
      async InscripcionEvento(event_enrollment) {
        let returnEntity = null;
        try {
          const sql = `INSERT INTO event_enrollments (id_event, id_user, description, registration_date_time, attended, observations, rating) 
                       VALUES ($1, $2, $3, $4, $5, $6, $7) 
                       RETURNING *`; 
      
          const values = [
            event_enrollment.idEvento,
            event_enrollment.id_user,
            event_enrollment.description || 'Inscripción al evento', 
            event_enrollment.registration_date_time,
            event_enrollment.attended || false,
            null, 
            null 
          ];
      
          const result = await this.DBClient.query(sql, values);
          returnEntity = result.rows[0]; // Devolver el primer registro insertado
        } catch (error) {
          console.log("Error al inscribir al evento:", error);
        }
        return returnEntity; // Devolver la entidad insertada
      }
      
      async eliminarInscripcion(id,id_user) {
        var returnEntity=true
        try {
            const sql = "DELETE FROM event_enrollments WHERE id_event = $1 AND id_user = $2";
            const values = [id, id_user]; 
            const result = await this.DBClient.query(sql, values);
            console.log(result)
            if (result.rowCount==0) {
            returnEntity=false
            }
          } catch (error) {
            console.log(error);
          }
          return returnEntity;
        }  

          async patchEvento(id,id_user,observations,rating) {
            let returnEntity = true;
            let query = ''; 
        
                query = `
                    UPDATE event_enrollments
                    SET `;
                
                const values = []; 
                const conditions = [];
        
                if (observations) {
                    conditions.push(`observations = $${values.length + 1}`);
                    values.push(observations);
                }
                if (rating) {
                    conditions.push(`rating = $${values.length + 1}`);
                    values.push(rating);
                }
                
                if (conditions.length > 0) {
                    query += conditions.join(", ");
                    query += ` WHERE id_event = $${values.length + 1} and id_user = $${values.length + 2}`; 
                    values.push(id);
                    values.push(id_user);

                }
                try {
                      const result = await this.DBClient.query(query, values);
                      if (result.rowCount==0) {
                        returnEntity=false
                        }
                      } catch (error) {
                        console.log(error);
                      }
        
            console.log("Query:", query);
            console.log("Values:", values);
            console.log("Result:", returnEntity);
            return returnEntity;
        }

        async getEventByEventLocation(id) {
          const query = "SELECT * FROM events WHERE id_event_location = $1";
          let returnEntity = null;
          try {
            const values = [id];
            const result = await this.DBClient.query(query, values);
            console.log(result.rows.length)
            if (result.rows.length > 0) {
              returnEntity = result.rows[0];
            }
          } catch (error) {
            console.log(error);
          }
          console.log(returnEntity);
          return returnEntity;
        }

      }




    
      
    

