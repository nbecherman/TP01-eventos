import { query } from "express";
import eventLocationRepository from "../repositories/event-location-repository.js"
const EventLocation= new eventLocationRepository();
import { Pagination} from "../utils/Paginacion.js";
const PaginacionConfig = new Pagination();

export default class eventLocation
{
    async getEventLocationsByUser(id_creator_user, limit, offset) {
        const parsedLimit = PaginacionConfig.parseLimit(limit);
        const parsedOffset = PaginacionConfig.parseOffset(offset); 
        const cantidad = Number.parseInt(await EventLocation.countEventLocations()); // cantidad total de event_locations del usuario
        const pagination = PaginacionConfig.buildPaginationDto(parsedLimit, parsedOffset, cantidad, "/event-location"); // Construye el objeto de paginación
        const eventLocations = await EventLocation.getEventLocationsByUser(id_creator_user, parsedLimit, parsedOffset);
        if (eventLocations!=null) {
            const collection = {eventLocations, pagination}
            return collection;
          }else{
            return eventLocations
          }  
        }

        async getEventLocationsById(id_creator_user, id, limit, offset) {
            const parsedLimit = PaginacionConfig.parseLimit(limit);
            const parsedOffset = PaginacionConfig.parseOffset(offset); 
            const cantidad = Number.parseInt(await EventLocation.countEventLocations()); // cantidad total de event_locations del usuario
            const nextPage=((parsedOffset+1) * parsedLimit<=cantidad) ?`/event-location/${id}`:"null";
            const pagination = PaginacionConfig.buildPaginationDto(parsedLimit, parsedOffset, cantidad, nextPage); // Construye el objeto de paginación
            const LocationsById = await EventLocation.getEventLocationsById(id_creator_user, id, limit, offset);
            if (LocationsById!=null) {
                const collection = {LocationsById, pagination}
                return collection;
              }else{
                return LocationsById
              }  
            }

            async getEventLocation(id) 
                {
                    const getEventLocation = await EventLocation.getEventLocation(id);
                    return getEventLocation;
                } 

                async getAllEventLocations() 
                  {
                      const getAllEventLocations = await EventLocation.getAllEventLocations();
                      return getAllEventLocations;
                  }   


                async getEventLocationByUserSinPag(id,id_creator_user) 
                {
                    const getEventLocation2 = await EventLocation.getEventLocationByUserSinPag(id,id_creator_user);
                    return getEventLocation2;
                } 

            async insertEventLocation(eventLoc) 
             {
                    await EventLocation.insertEventLocation(eventLoc);
                    return "insertado";
             }   
             
             async UpdateEventLocation(eventLoc) 
             {
                    const result = await EventLocation.UpdateEventLocation(eventLoc);
                    return result;
             }   

             async deleteEventLocation(id) 
             {
                    await EventLocation.deleteEventLocation(id);
                    return "eliminado";
             }   

             
}