  import express from "express";
  import eventService from "../servicios/event-service.js";
 // import { AuthMiddleware } from "../auth/authMiddleware.js";
  import Evento from "../entities/Evento.js";

  const EventService = new eventService();
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



    router.get("/:id/enrollment", async(request,response) =>{ //terminado (:

      const id = request.params.id; 
      const name = request.query.name; 
      const username = request.query.username; 
      const first_name = request.query.first_name; 
      const last_name = request.query.last_name; 
      const attended = request.query.attended;
      const rating = request.query.rating; 
        try {
          const allParticipantes = await EventService.getAllParticipantes(id,name,username, first_name, last_name, attended, rating);
          console.log(allParticipantes)
          return response.json(allParticipantes);
        } catch (error) {
          console.error("Un Error en el controller", error);
          return response.json("Un Error");
        
      } 
    });

    
    router.post("/", async(request, response) => { 
      try {
      const nuevoEvento = request.body; 
      const eventoCreado = await EventService.createEvent(nuevoEvento);
      return response.json(eventoCreado);
      } catch (error) {
      console.error("Error al crear una nuevo evento:", error);
      return response.json("Un Error");
      }
  });

  router.put("/:id",async (request, response) => {
    const id = request.params.id;
    if (!isNaN(id)) {
    try {
      const eventoActualizado = request.body; 
      const eventoModificada =await EventService.updateEvent(id,eventoActualizado);
      return response.json(eventoModificada);
    } catch (error) {
      console.error("Error al actualizar el evento:", error);
      return response.json("Un Error");
    }
    } else {
        return response.json("El parámetro ID no cumple con el tipo de dato esperado.");
    }
  });

  router.post("/:id/enrollment",async(request, response) => {

    const idEvento = request.query.idEvento; 
    const attended = request.query.attended; 
    const rating = request.query.rating; 
    const descripcion = request.query.descripcion; 
    const observations = request.query.observations;
    try {
      const inscripcion = await EventService.InscripcionEvento(idEvento,attended,rating,descripcion,observations);
      return res.json(inscripcion);
    } catch (error) {
      console.log(error);
      return res.json(error);
    }
  });

  router.patch("/:id/enrollment", async(request, response) => {
    const idEvento = request.params.idEvento;
    const rating = request.query.rating;
    try {
      const cambiar = await EventService.CambiarRating(idEvento, rating);
      return res.json(cambiar);
    } catch (error) {
      console.log(error);
      return res.json(error);
    }
  });




export default router;
