  import express from "express";
  import eventService from "../servicios/event-service.js";
  import { AuthMiddleware } from "../auth/authMiddleware.js";

  const EventService = new eventService();


    const router = express.Router();

    router.get("/", async (request, response) => {
      const limit = request.query.limit;  //cantidad maxima de elementos por pagina
      const offset = request.query.offset; // el num de pagina por el cual voy a operar
      //URL : La url de la siguiente pagina.

      limit = parseInt(limit); 
      offset = parseInt(offset); 

      if (!isNaN(limit) && !isNaN(offset)) {
        try {
          const allEvents = await EventService.getAllEvents(limit, offset);
          return response.json(allEvents);
        } catch (error) {
          console.error("Un Error en el controller", error);
          return response.json("Un Error");
        }
      } else {
        return response.json("Los parámetros limit y offset deben ser números.");
      }
    });

    router.get("/", async (request, response) => {
      let pageSize = request.query.pageSize; 
      let page = request.query.page;
      const nombre = request.query.nombre; 
      const categoria = request.query.categoria;
      const fechaI = request.query.fechaI; 
      const tag = request.query.tag;

      pageSize = parseInt(pageSize);
      page = parseInt(page);

      if (!isNaN(pageSize) && !isNaN(page) && typeof nombre === "string" && typeof categoria === "string" && typeof tag === "string" && !isNaN(Date.parse(fechaI))) {
        try {
          const filter = await EventService.getEventByFilter(pageSize, page, nombre, categoria, fechaI, tag);
          return response.json(filter);
        } catch (error) {
          console.error("Un Error en el controller", error);
          return response.json("Un Error");
        }
      } else {
        return response.json("Los parámetros no cumplen con los tipos de datos esperados.");
      }
    });


    router.get("/:id",async (request,response) =>{
      let id = request.params.id;
      id = parseInt(id);

      if (!isNaN(id)) {
        try {
          const allEvents = await EventService.getEventDetail(id);

          return response.json(allEvents);
        } catch (error) {
          console.error("Un Error en el controller", error);
          return response.json("Un Error");
        }
      } else {
        return response.json("El parámetro ID no cumple con el tipo de dato esperado.");
      }
    });

    router.get("/:id/enrollment", async(request,response) =>{

      const name = request.query.name; 
      const username = request.query.username; 
      const first_name = request.query.first_name; 
      const last_name = request.query.last_name; 
      const attended = request.query.attended;
      const rating = request.query.rating; 
      if (typeof name === "string" && typeof username === "string" && typeof first_name === "string" && typeof last_name === "string" && (attended === "true" || attended === "false" || attended === null) && !isNaN(rating)) {
        try {
          const allParticipantes = await EventService.getAllParticipantes(name,username, first_name, last_name, attended, rating);
          return response.json(allParticipantes);
        } catch (error) {
          console.error("Un Error en el controller", error);
          return response.json("Un Error");
        }
      } else {
        return response.json("Los parámetros no cumplen con los tipos de datos esperados.");
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
