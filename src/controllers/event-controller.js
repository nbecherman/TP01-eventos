  import express from "express";
  import eventService from "../servicios/event-service.js";
  import locationService from "../servicios/location-service.js";

  import authMiddleware from "../auth/authMiddleware.js";
  import Evento from "../entities/Evento.js";
  import EventLocation from "../entities/EventLoc.js";


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
          console.log("entre")
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
            return res.status(200).json(allEvents);
          }
          else
          {
            return res.status(404).send(); //inexistente
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

    
    router.post("/",authMiddleware,async(request, response) => {  // postman (:
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
      Evento.id_creator_user = request.user.id; //del auth

      try {

        var eventolocacion = await LocationService.getEventLocationById(Evento.id_event_location) 

        if (Evento.name && Evento.description && Evento.id_event_category && Evento.id_event_location && Evento.start_date && Evento.duration_in_minutes && Evento.price && Evento.enabled_for_enrollment && Evento.max_assistance && Evento.id_creator_user) 
        {
          if (eventolocacion.max_capacity > Evento.max_assistance)
          {
             if(Evento.name.length >3 && Evento.description.length >3) 
            {
              if  (Evento.price > 0 && Evento.duration_in_minutes > 0) 
              {
                const eventoCreado = await EventService.createEvent(Evento);
                return response.status(201).json(eventoCreado);
              } 
              else
              {
                return response.status(400).send("el precio y/o la duracion es menor a 0 ")
              }
            }
            else
            {
              return response.status(400).send("el nombre y/o descripcion tiene menos de 3 caracteres ")
            }
          }
          else
          {
            return response.status(400).send("La asistencia es mayor a la capacidad")
          }
        }
        else
        {
          return response.status(400).send("Error en el tipo de dato o faltan")
        }
      } catch (error) {
      console.error("Error al crear una nuevo evento:", error);
      return response.json("Un Error");
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
          if(eventolocacion.max_capacity > Evento.max_assistance) //arreglar esto
            {
              return response.status(400).send("La asistencia es mayor a la capacidad")
            }
        }
        
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


    router.post("/:id/enrollment",authMiddleware,async(request, response) => { //postman

      const event_enrollment = {};
       event_enrollment.idEvento = request.params.id; 
       event_enrollment.id_user = request.user.id;  
       event_enrollment.description = request.body.description;  
       event_enrollment.registration_date_time = new Date().toISOString();
       event_enrollment.attended = request.body.attended;  
       event_enrollment.observations = request.body.observations;  
       event_enrollment.rating = request.body.rating;  

       const event = await EventService.getEventId(event_enrollment.idEvento);
       const inscriptos = await EventService.getInscriptosAlEvento(event_enrollment.idEvento);
       console.log(inscriptos);

      try {
        if (!event) {
          return response.status(404).send("El evento no existe.");
        }
      
        const registrado = await EventService.isUserRegistered(event_enrollment.idEvento, event_enrollment.id_user);
        console.log(registrado);
        if (registrado) {
            return response.status(400).send("El usuario ya está registrado en el evento.");
        }
       
        if (!event.enabled_for_enrollment) {
          return response.status(400).send("El evento no está habilitado para la inscripción.");
          }

          const date = new Date();
          const dateEvento = new Date(event.start_date);
          if (date <= dateEvento) {
              return response.status(400).send("El evento ya ha sucedido o está programado para hoy.");
          }


          if (event.max_assistance <= inscriptos ) {
              return response.status(400).send("Se ha excedido la capacidad máxima de registrados.");
          }

        const inscripcion = await EventService.InscripcionEvento(event_enrollment);
        return response.json(inscripcion);
      } catch (error) {
        console.log(error);
        return response.json(error);
      }
    });

    router.delete("/:id/enrollment", authMiddleware , async (request, response) => {
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
        console.log(eliminarEvento + "wwww")
        if (eliminarEvento == true) {
          return response.status(201).send("Eliminado");
        }
        else
        {
          return response.status(404).send("No estas registrado al evento");
        }
      } catch (error) {
        console.log(error);
        return response.json(error);
      }
    });


    router.patch("/:id/enrollment", async(request, response) => {
          const id = request.body.params
          try {
            const cambiar = await EventService.CambiarRating(idEvento, rating);
            return res.json(cambiar);
          } catch (error) {
            console.log(error);
            return res.json(error);
          }
        });

 

        
export default router;
