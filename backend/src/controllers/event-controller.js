  import express from "express";
  import eventService from "../servicios/event-service.js";
  import locationService from "../servicios/location-service.js";

  import authMiddleware from "../auth/authMiddleware.js";



  const EventService = new eventService();
  const LocationService = new locationService();

  const router = express.Router();
  router.get("/", async (request, response) => {
      const Evento = {};
      const limit = request.query.limit || 10; // Valor por defecto - registros por pagina
      const offset = request.query.offset||0;  //empieza desde 0 - del 0-10. punto de inicio
      Evento.name = request.query.name;
      Evento.category = request.query.category;
      Evento.startDate = request.query.startDate;
      Evento.tag = request.query.tag;
  
      try {
          const filter = await EventService.getEventByFilter(Evento, limit, offset);
          return response.json(filter);
      } catch (error) {
          console.error("Un Error en el controller", error);
          return response.status(500).json({ error: "Un Error" });
      }
  });
    

    router.get("/:id",async (request,response) =>{   //terminado (:
      let id = request.params.id;

      if (!isNaN(id)) {
        try {
          const allEvents = await EventService.getEventDetail(id);
          if (allEvents) {
            return response.status(200).json(allEvents);
          }
          else
          {
            return res.status(404).send("no existe el evento"); 
          }
        } catch (error) {
          console.error("Un Error en el controller", error);
          return response.json("Un Error");
        }
      } else {
        return response.json("El parámetro ID no cumple con el tipo de dato esperado.");
      }
    });



    router.get("/:id/enrollment", async(request,response) =>{ //postman
      const Evento_Enrrolment = {};
      Evento_Enrrolment.id = request.params.id; 
      Evento_Enrrolment.first_name = request.query.first_name; 
      Evento_Enrrolment.last_name = request.query.last_name; 
      Evento_Enrrolment.username = request.query.username; 
      Evento_Enrrolment.attended = request.query.attended;
      Evento_Enrrolment.rating = request.query.rating; 
        try {
          const allParticipantes = await EventService.getAllParticipantes(Evento_Enrrolment);
          console.log(allParticipantes)
          return response.status(200).json(allParticipantes);
        } catch (error) {
          console.error("Un Error en el controller", error);
          return response.json("Un Error");
    
      } 
    });

    
    router.post("/", authMiddleware, async (request, response) => { // postman
      const Evento = {};
      Evento.name = request.body.name;
      Evento.description = request.body.description;
      Evento.id_event_category = request.body.id_event_category;
      Evento.id_event_location = request.body.id_event_location;
      Evento.id_tag = request.body.id_tag;
      Evento.start_date = request.body.start_date;
      Evento.duration_in_minutes = request.body.duration_in_minutes;
      Evento.price = request.body.price;
      Evento.enabled_for_enrollment = request.body.enabled_for_enrollment;
      Evento.max_assistance = request.body.max_assistance;
      Evento.id_creator_user = request.user.id;
      console.log(Evento + "aaaaaaaa");
      try {
          var eventolocacion = await LocationService.getEventLocationById(Evento.id_event_location);
          
          if (Evento.name && Evento.description && Evento.id_event_category && Evento.id_event_location && Evento.start_date && Evento.duration_in_minutes && Evento.price && Evento.enabled_for_enrollment && Evento.max_assistance && Evento.id_creator_user && Evento.id_tag) {
              if (eventolocacion.max_capacity > Evento.max_assistance) {
                  if (Evento.name.length > 3 && Evento.description.length > 3) {
                      if (Evento.price > 0 && Evento.duration_in_minutes > 0) {
                          const eventoCreado = await EventService.createEvent(Evento);
                          return response.status(201).json({ message: "Evento creado exitosamente" });
                      } else {
                          return response.status(400).json({ message: "El precio y/o la duración son menores a 0" });
                      }
                  } else {
                      return response.status(400).json({ message: "El nombre y/o descripción tienen menos de 3 caracteres" });
                  }
              } else {
                  return response.status(400).json({ message: "La asistencia es mayor a la capacidad" });
              }
          } else {
              return response.status(400).json({ message: "Error en el tipo de dato o faltan campos" });
          }
      } catch (error) {
          console.error("Error al crear un nuevo evento:", error);
          return response.status(500).json({ message: "Ocurrió un error al crear el evento", error: error.message });
      }
  });
  
  router.put("/",authMiddleware,async(request, response) => {  //postman
    const Evento = {};
    Evento.name = request.body.name;
    Evento.description = request.body.description;
    Evento.id_event_category = request.body.id_event_category
    Evento.id_event_location = request.body.id_event_location
    Evento.start_date = request.body.start_date;
    Evento.duration_in_minutes = request.body.duration_in_minutes;
    Evento.price = request.body.price;
    Evento.enabled_for_enrollment = request.body.enabled_for_enrollment;
    Evento.max_assistance = request.body.max_assistance;
    Evento.id = request.body.id; 
    try {
      if (!Evento.id) {
        return response.status(400).send("ID del evento no proporcionado o es inválido");
      }
      const idevento = await EventService.getEventId(Evento.id);
      if (!idevento) {
          return response.status(404).send("No existe el evento con el ID proporcionado");
      }
     
      if(Evento.id_event_location && Evento.max_assistance )
        {
          const eventolocacion = await LocationService.getEventLocationById(Evento.id_event_location);
          if(eventolocacion)
          {
            if(eventolocacion.max_capacity < Evento.max_assistance) 
            {
              return response.status(400).send("La asistencia es mayor a la capacidad")
            }
          }
          else
          {
            return response.status(400).send("no existe la id location")}
          }
          else
          {
            return response.status(400).send("No mandaste el id location o la maxima asistencia")}



        
      if (Evento.name) {
          if(Evento.name.length<3) 
            { 
              return response.status(400).send("el nombre tiene menos de 3 caracteres ")
            }
      }
      if (Evento.description) {
        if(Evento.description.length <3) 
          {
            return response.status(400).send("La descripcion tiene menos de 3 caracteres ")
          }
        }
        if (Evento.duration_in_minutes) {
          if(Evento.description.lengt<0) 
            {
              return response.status(400).send("La duracion es menor a 0 ")
            }
          }
          if (Evento.precio) {
            if(Evento.precio<0) 
              {
                return response.status(400).send("El precio es menor a 0 ")
              }
            }
            const eventoActualizado = await EventService.updateEvent(Evento);
            return response.status(201).json(eventoActualizado);
      }
  

    catch (error) {
    console.error("Error al crear una nuevo evento:", error);
    return response.json("Un Error");
    }
});

  router.delete("/:id",authMiddleware,async(request, response) => { //postman (:
    const idEvento =  request.params.id; 
    var ideve = await EventService.getEventId(idEvento) 
    var tags = await EventService.getTagsByEvent(idEvento)
    var enrrollments = await EventService.getEnrolmentsById(idEvento)
    try 
    {
    if (ideve.id) {
      if (tags==null) {
        if (enrrollments==null) {
          const eliminar = await EventService.deleteEvent(idEvento);
          return response.status(200).json(eliminar); 
        }
        else
        {
          return response.status(400).json("Tiene enrrolments");
        }
      }
      else
      {
        return response.status(400).json("Tiene tags");

      }
      } 
      else
      {
      return response.status(400).json("No existe la id");
      }
    }
      catch (error) {
        console.log(error);
        return response.json(error);
      }
    });


    router.post("/:id/enrollment", authMiddleware, async (request, response) => {
      const event_enrollment = {
        idEvento: request.params.id,
        id_user: request.user.id,
        description: request.body.description || 'Inscripción al evento', // Descripción por defecto
        attended: request.body.attended || false, // Valor por defecto
        registration_date_time: new Date().toISOString()
      };
      try {
        // Verificar la existencia del evento
        const event = await EventService.getEventId(event_enrollment.idEvento);
        if (!event) {
          return response.status(404).json({ error: 'El evento no existe.' });
        }
    
        // Verificar si el usuario ya está registrado
        const registrado = await EventService.isUserRegistered(event_enrollment.idEvento, event_enrollment.id_user);
        if (registrado) {
          return response.status(400).json({ error: 'El usuario ya está registrado en el evento.' });
        }
    
        // Verificar si el evento está habilitado para inscripciones
        if (!event.enabled_for_enrollment) {
          return response.status(400).json({ error: 'El evento no está habilitado para la inscripción.' });
        }
    
        // Verificar la fecha del evento
        const date = new Date();
        const dateEvento = new Date(event.start_date);
        if (date >= dateEvento) {
          return response.status(400).json({ error: 'El evento ya ha sucedido o está programado para hoy.' });
        }
    
        // Verificar la capacidad máxima
        const inscriptos = await EventService.getInscriptosAlEvento(event_enrollment.idEvento);
        if (event.max_assistance <= inscriptos) {
          return response.status(400).json({ error: 'Se ha excedido la capacidad máxima de registrados.' });
        }
    
        // Inscribir al usuario en el evento
        await EventService.InscripcionEvento(event_enrollment);
        return response.status(201).json({ message: 'Inscripción exitosa.' });
    
      } catch (error) {
        console.error("Error en la inscripción:", error);
        return response.status(500).json({ error: 'Error interno del servidor.' });
      }
    });
    

    router.delete("/:id/enrollment", authMiddleware , async (request, response) => { //postman
      const id = request.params.id;
      const id_user = request.user.id;  
      try {
        if (!id) {
          return response.status(400).send("ID del evento no proporcionado o es inválido");
        }
        const idevento = await EventService.getEventId(id);
        if (!idevento) {
            return response.status(404).send("No existe el evento con el ID proporcionado");
        }
        const eliminarEvento =await EventService.eliminarInscripcion(id,id_user)
        
        if (eliminarEvento == true) {
          return response.status(201).send("Eliminado");
        }
        else
        {
          return response.status(400).send("No estas registrado al evento");
        }
      } catch (error) {
        console.log(error);
        return response.json(error);
      }
    });


    router.patch("/:id/enrollment/:rating",authMiddleware , async(request, response) => { //postman
          const rating = request.params.rating;      
          const observations = request.body.observations;            
          const id_user = request.user.id;  
          const id = request.params.id;
          
          try {
            if (!id) {
              return response.status(401).send("ID del evento no es proporcionado o es inválido");
            }

            const idevento = await EventService.getEventId(id);
            if (!idevento) {
                return response.status(404).send("No existe el evento con el ID proporcionado");
            }
            if (rating < 1 || rating > 10) {
              return response.status(400).send("Los valores del rating, no se encuentran entre 1 y 10");
            }
            
            const event = await EventService.getEventId(id);
            const date = new Date();
            const dateEvento = new Date(event.start_date);

            if (date <= dateEvento) {
                return response.status(400).send("El evento no ha sucedido o está programado para hoy.");
            }


            const patchEvento =await EventService.patchEvento(id,id_user,observations,rating)

            if (patchEvento == true) {
              return response.status(201).send("actualizado");
            }
            else
            {
              return response.status(404).send("No estas registrado al evento");
            }
          }
          catch (error) {
            console.log(error);
            return response.json(error);
          }
        });

 

        
export default router;
