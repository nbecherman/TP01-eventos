import express from "express";
import eventLocationService  from "../servicios/eventLocation-service.js";
import eventService  from "../servicios/event-service.js";

import AuthMiddleware from "../auth/authMiddleware.js";
import LocationService  from "../servicios/location-service.js";

const router = express.Router();
const EventLocationService = new eventLocationService();
const EventService = new eventService();
const locationService = new LocationService();

// Ruta para obtener todas las event_locations del usuario autenticado, con paginación
router.get("/", AuthMiddleware, async (request, response) => {
    const limit = request.query.limit || 10; 
    const offset = request.query.offset||0; 
    const id_creator_user = request.user.id; 
  try {
    const eventLocations = await EventLocationService.getEventLocationsByUser(id_creator_user, limit, offset);
    if (eventLocations != null) {
      return response.status(200).json(eventLocations);
    } else {
      return response.status(404).json("el user no tiene locations");
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "error" });
  }
});

// Ruta para obtener una event_location específica por ID, solo si pertenece al usuario autenticado
router.get("/:id", AuthMiddleware, async (request, response) => {
    const limit = request.query.limit || 10; 
    const offset = request.query.offset||0; 
    const id_creator_user = request.user.id; 
    const id = request.params.id
  try {
    const eventLocationsById = await EventLocationService.getEventLocationsById(id_creator_user, id, limit, offset);
    const evloc = await EventLocationService.getEventLocation(id)
    if(!evloc)
    {
    return response.status(404).json("el event location no existe");
    } 
    if (eventLocationsById != null) {
      return response.status(200).json(eventLocationsById);
    } else {
      return response.status(404).json("el id del event location no es del user");
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "error" });
  }
});



// Ruta para crear una nueva event_location, asignando el usuario autenticado como creador
router.post("/", AuthMiddleware, async (request, response) => {
    const eventLocation = {}
    eventLocation.name = request.body.name
    eventLocation.id_location = request.body.id_location
    eventLocation.full_address = request.body.full_address
    eventLocation.max_capacity = request.body.max_capacity
    eventLocation.latitude = request.body.latitude
    eventLocation.longitude = request.body.longitude
    eventLocation.id_creator_user = request.user.id;
  try {
    if (eventLocation.name && eventLocation.full_address && eventLocation.name.length > 3 && eventLocation.full_address.length > 3) {
        if(!isNaN(eventLocation.latitude) && !isNaN(eventLocation.longitude)){
        const locationExists = await locationService.getEventLocationById(eventLocation.id_location);
      if (locationExists) {
        if (eventLocation.max_capacity > 0) {
          const insertEL = await EventLocationService.insertEventLocation(eventLocation);
          return response.status(201).json(insertEL);
        } else {
          return response.status(400).json("Error capacidad maxima");
        }
      } else {
        return response.status(400).json("Location ID no existe");
      }
    }
    else
    {
    return response.status(400).json("Longitud o latitude no son numeros");
    }
    } else {
      return response.status(400).json("nombre invalido o full_addres");
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Error" });
  }
});

// Ruta para actualizar una event_location existente
router.put("/", AuthMiddleware, async (request, response) => {
    const eventLocation = {}
    eventLocation.id = request.body.id
    eventLocation.name = request.body.name
    eventLocation.id_location = request.body.id_location
    eventLocation.full_address = request.body.full_address
    eventLocation.max_capacity = request.body.max_capacity
    eventLocation.latitude = request.body.latitude
    eventLocation.longitude = request.body.longitude
    eventLocation.id_creator_user = request.user.id;
  try {
    
  

    if (eventLocation.name) {
        if (eventLocation.name.length < 3) {
            return response.status(400).json("nombre invalido ");

        }
    }
    if (eventLocation.full_address) {
        if (eventLocation.full_address.length < 3) {
            return response.status(400).json("full_addres invalido");
        }
    }
    if (eventLocation.id_location) {
     const locationExists = await locationService.getEventLocationById(eventLocation.id_location);
        if (!locationExists) 
            {
                return response.status(400).json("Location ID no existe");
            } 
    }
    if (eventLocation.id_location) {
        const locationExists = await locationService.getEventLocationById(eventLocation.id_location);
           if (!locationExists) 
               {
                   return response.status(400).json("Location ID no existe");
               } 
       }
       if (eventLocation.latitude) {
        if(!isNaN(eventLocation.latitude)){
        }else{
          return response.status(400).send("Latitude no es un numero");
        } 
      }
      if (eventLocation.longitude ) {
        if(!isNaN(eventLocation.longitude)){ 
        }else{
          return response.status(400).send("Longitud no es un numero");
        } }

            const capacity = Number(eventLocation.max_capacity);
            if (!isNaN(capacity)) {
                if (capacity <= 0) {
                    return response.status(400).json("Error capacidad maxima");
                }
            }
            
          const updateEvLoc = await EventLocationService.UpdateEventLocation(eventLocation);
          return response.status(201).json(updateEvLoc);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Error" });
  }
});

// Ruta para eliminar una event_location específica por ID, solo si pertenece al usuario autenticado
router.delete("/:id", AuthMiddleware, async (request, response) => {
  const id = request.params.id;
  const id_creator_user = request.user.id;

  try {
    const evloc = await EventLocationService.getEventLocation(id)
    const evlocByUser = await EventLocationService.getEventLocationByUserSinPag(id,id_creator_user)
    const events = await EventService.getEventByEventLocation(id)
    
    if(!evloc)
    {
    return response.status(404).json("el event location no existe");
    } 
    if(!evlocByUser)
    {
    return response.status(404).json("el event location le pertenece a otro usuario");
    } 
    if(events)
        {
        return response.status(404).json("el event location pertenece a un evento");
        } 
    // Verifica que la event_location pertenezca al usuario autenticado antes de eliminarla
      await EventLocationService.deleteEventLocation(id);
      return response.status(200).json("Eliminado");
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Error" });
  }
});

export default router;

