import express from "express";
import { eventService } from "../servicios/event-service.js";

const EventService = new eventService();

const router = express.Router();

router.get("/", (request, response) => {
    //const limit = request.query.limit;
    //const offset = request.query.offset;
    const limit = 20;
    const offset= 1;
    try {
      console.log("get")
      const allEvents = EventService.getAllEvents(limit, offset);
      return response.json(allEvents);
    } catch (error) {
      console.log("Un Error en el controller");
      return response.json("Un Error");
    }
  });

  export default router;