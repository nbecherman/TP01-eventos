import { query } from "express";
import locationRepository from "../repositories/location-repositories.js"
const LocationRepository= new locationRepository();
import { Pagination} from "../utils/Paginacion.js";
const PaginacionConfig = new Pagination();

export default class eventLocation
{
async getEventLocationById(id) //sacar de aca
{
    const getEventLocationById = await LocationRepository.getEventLocationById(id);
    return getEventLocationById;
}   

async getLocationByProvince(id) //se utiliza en province
{
    const getLocationByProvince = await LocationRepository.getLocationByProvince(id);
    return getLocationByProvince;
}   

async getLocalidades(limit, offset) {
    const parsedLimit = PaginacionConfig.parseLimit(limit) 
    const parsedOffset = PaginacionConfig.parseOffset(offset)
    const cantidad =  Number.parseInt(await LocationRepository.countLocalidades()); //cantidad de eventos
    const nextPage=((parsedOffset+1) * parsedLimit<=cantidad) ?`/location ?`:"null"
    const paginacion = PaginacionConfig.buildPaginationDto(parsedLimit, parsedOffset, cantidad, nextPage)
    const localidades = await LocationRepository.getLocalidades(parsedLimit, parsedOffset)
    if (localidades!=null) {
      const collection = {localidades, paginacion}
      return collection;
    }else{
      return {localidades}
    }  
  }

    // Método para obtener una localidad por su ID
    async getLocalidadById(id) {
    return await LocationRepository.getLocalidadById(id);
    }

    async getEvLocByLocalidad(id_location, limit, offset) {
        const parsedLimit = PaginacionConfig.parseLimit(limit) 
        const parsedOffset = PaginacionConfig.parseOffset(offset)
        const cantidad =  Number.parseInt(await LocationRepository.countLocalidades()); //cantidad de eventos
        const nextPage=((parsedOffset+1) * parsedLimit<=cantidad) ?`/location/${id_location}/event-location`:"null";
        const paginacion = PaginacionConfig.buildPaginationDto(parsedLimit, parsedOffset, cantidad, nextPage)
        const localidadesEvent = await LocationRepository.getEventLocationsByLocation(id_location,parsedLimit, parsedOffset)
        if (localidadesEvent!=null) {
          const collection = {localidadesEvent, paginacion}
          return collection;
        }else{
          return {localidadesEvent}
        }  
      }
}
