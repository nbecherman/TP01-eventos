import express from "express";
import { eventService } from "../servicios/event-service.js";


const router = express.Router();
const EventService = new eventService();



router.get("/", (request, response) => {
    const limit = request.query.limit;
    const offset = request.query.offset;

  
    try {
      const allEvents = eventService.getAllEvents(limit, offset);
      return response.json(allEvents);
    } catch (error) {
      console.log("Un Error en el controller");
      return response.json("Un Error");
    }
  });

  export default router;