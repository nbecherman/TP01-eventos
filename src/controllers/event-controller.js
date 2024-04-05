import express, { request } from "express";
import { eventService, eventService1,eventService2,eventService3 } from "../servicios/event-service.js";

const EventService = new eventService();
const EventService1 = new eventService1();
const EventService2 = new eventService2();
const EventService3 = new eventService3();



const router = express.Router();

router.get("/", (request, response) => {
  //const limit = request.query.limit;
  //const offset = request.query.offset;
  const limit = 20;
  const offset = 1;
  try {
    const allEvents = EventService.getAllEvents(limit, offset);
    return response.json(allEvents);
  } catch (error) {
    return response.json("Un Error");
  }
});

//3

router.get("/", (request, response) => {
  const pageSize = request.query.pageSize; //limit
  const page = request.query.page; //offset
  const nombre = request.query.nombre;
  const categoria = request.query.categoria;
  const fechaI = request.query.fechaI;
  const tag = request.query.tag;

  if (!isNaN(Date.parse(fechaI))) { //si no es date 
  try {
      const filter = EventService1.getEventByFilter(
        1,
        1,
        "Gualeguaychu",
        "Guaracha",
        "2021/07/01",
        "tag"
      );
      return response.json(filter);
    } catch (error) {
      console.log("Un Error en el controller");
      return response.json("Un Error");
    }
  } else {
    return response.json("La fecha no es datetime");
  }
});

//4
router.get("/", (request, response) => {
  const pageSize = request.query.pageSize; //limit
  const page = request.query.page; //offset
  const nombre = request.query.id; //pedir id desde el url

  try {
      const filter = EventService1.getEventByFilter(
        1,
      );
      return response.json(filter);
    } catch (error) {
      console.log("Un Error en el controller");
      return response.json("Un Error");
    }
  }
);



router.get("/:id",(request,response) =>{
const id = request.query.id;
try {
  const allEvents = EventService2.getEventDetail(1);
  return response.json(allEvents);
} catch (error) {
  return response.json("Un Error");
}
});




export default router;
