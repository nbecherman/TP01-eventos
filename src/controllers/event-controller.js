  import express from "express";
  import eventService from "../servicios/event-service.js";

  const EventService = new eventService();


  const router = express.Router();

  router.get("/", (request, response) => {
    const limit = request.query.limit;  //cantidad maxima de elementos por pagina
    const offset = request.query.offset; // el num de pagina por el cual voy a operar
    //URL : La url de la siguiente pagina.

    limit = parseInt(limit); 
    offset = parseInt(offset); 

    if (!isNaN(limit) && !isNaN(offset)) {
      try {
        const allEvents = EventService.getAllEvents(limit, offset);
        return response.json(allEvents);
      } catch (error) {
        console.error("Un Error en el controller", error);
        return response.json("Un Error");
      }
    } else {
      return response.json("Los parámetros limit y offset deben ser números.");
    }
  });

  router.get("/", (request, response) => {
    const pageSize = request.query.pageSize; 
    const page = request.query.page;
    const nombre = request.query.nombre; 
    const categoria = request.query.categoria;
    const fechaI = request.query.fechaI; 
    const tag = request.query.tag;

    pageSize = parseInt(pageSize);
    page = parseInt(page);

    if (!isNaN(pageSize) && !isNaN(page) && typeof nombre === "string" && typeof categoria === "string" && typeof tag === "string" && !isNaN(Date.parse(fechaI))) {
      try {
        const filter = EventService.getEventByFilter(pageSize, page, nombre, categoria, fechaI, tag);
        return response.json(filter);
      } catch (error) {
        console.error("Un Error en el controller", error);
        return response.json("Un Error");
      }
    } else {
      return response.json("Los parámetros no cumplen con los tipos de datos esperados.");
    }
  });


  router.get("/:id",(request,response) =>{
    const id = request.params.id;
    id = parseInt(id);

    if (!isNaN(id)) {
      try {
        const allEvents = EventService.getEventDetail(id);
        return response.json(allEvents);
      } catch (error) {
        console.error("Un Error en el controller", error);
        return response.json("Un Error");
      }
    } else {
      return response.json("El parámetro ID no cumple con el tipo de dato esperado.");
    }
  });

  router.get("/:id/enrollment",(request,response) =>{

    const pageSize = request.query.pageSize; 
    const page = request.query.page; 
    const id = request.query.id; 
    const username = request.query.username; 
    const first_name = request.query.first_name; 
    const last_name = request.query.last_name; 
    const attended = request.query.attended;
    const rating = request.query.rating; 
    const description = request.query.description;

    pageSize = parseInt(pageSize);
    page = parseInt(page);
    id = parseInt(id);

    if (!isNaN(pageSize) && !isNaN(page) && !isNaN(id) && typeof username === "string" && typeof first_name === "string" && typeof last_name === "string" && (attended === "true" || attended === "false" || attended === null) && !isNaN(rating) && typeof description === "string") {
      try {
        const allParticipantes = EventService.getAllParticipantes(pageSize, page, id, username, first_name, last_name, attended, rating, description);
        return response.json(allParticipantes);
      } catch (error) {
        console.error("Un Error en el controller", error);
        return response.json("Un Error");
      }
    } else {
      return response.json("Los parámetros no cumplen con los tipos de datos esperados.");
    }
  });

  
  router.post("/", (request, response) => {
    try {
    const nuevoEvento = request.body; 
    const eventoCreado = EventService.createEvent(nuevoEvento);
    return response.json(eventoCreado);
    } catch (error) {
    console.error("Error al crear una nuevo evento:", error);
    return response.json("Un Error");
    }
});

router.put("/:id", (request, response) => {
  const id = request.params.id;
  if (!isNaN(id)) {
  try {
    const eventoActualizado = request.body; 
    const eventoModificada = EventService.updateEvent(id,eventoActualizado);
    return response.json(eventoModificada);
  } catch (error) {
    console.error("Error al actualizar el evento:", error);
    return response.json("Un Error");
  }
  } else {
      return response.json("El parámetro ID no cumple con el tipo de dato esperado.");
  }
});




export default router;
