import express from "express";
import { eventService, eventService1, eventService2, eventService3 } from "../servicios/event-service.js";

const EventService = new eventService();
const EventService1 = new eventService1();
const EventService2 = new eventService2();
const EventService3 = new eventService3();

const router = express.Router();

router.get("/", (request, response) => {
  const limit = request.query.limit; 
  const offset = request.query.offset; 

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
      const filter = EventService1.getEventByFilter(pageSize, page, nombre, categoria, fechaI, tag);
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
      const allEvents = EventService2.getEventDetail(id);
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
      const allParticipantes = EventService3.getAllParticipantes(pageSize, page, id, username, first_name, last_name, attended, rating, description);
      return response.json(allParticipantes);
    } catch (error) {
      console.error("Un Error en el controller", error);
      return response.json("Un Error");
    }
  } else {
    return response.json("Los parámetros no cumplen con los tipos de datos esperados.");
  }
});




export default router;
