import { query } from "express";
import eventRepository from "../repositories/event-repositories.js"
import { Pagination} from "../utils/Paginacion.js";
const PaginacionConfig = new Pagination();

const EventRepository= new eventRepository();

export default class eventService {
 

    async getEventByFilter(Evento, limit, offset) {
      const parsedLimit = PaginacionConfig.parseLimit(limit) 
      const parsedOffset = PaginacionConfig.parseOffset(offset)
      const cantidad =  Number.parseInt(await EventRepository.cantidadEventosPag()); //cantidad de eventos
      const nextPage=((parsedOffset+1) * parsedLimit<=cantidad) ?`/event?${(Evento.name) ?`&name=${Evento.name}`:''}${(Evento.category) ?`&category=${Evento.category}` : ''}${(Evento.startDate) ?`&startDate=${Evento.startDate}`:''}${(Evento.tag) ?`&tag=${Evento.tag}`:''}`:"null"
      const paginacion = PaginacionConfig.buildPaginationDto(parsedLimit, parsedOffset, cantidad, nextPage)
      const eventosPorFiltro = await EventRepository.getEventByFilter(Evento, parsedLimit, parsedOffset)
      if (eventosPorFiltro!=null) {
        const collection = {eventosPorFiltro, paginacion}
        return collection;
      }else{
        return {eventosPorFiltro}
      }  
    }
  
  async getEventDetail(id) 
  {
    const getEventDetail = await EventRepository.getEventDetail(id);
    return getEventDetail;
  }

  async getEventId(id) 
  {
    const getEventId = await EventRepository.getEventId(id);
    return getEventId;
  }


  async getAllParticipantes(id,name,username, first_name, last_name, attended, rating)
  {
    const getAllParticipantes = await EventRepository.getAllParticipantes(id,name,username, first_name, last_name, attended, rating);
    console.log(getAllParticipantes)
    return getAllParticipantes;
  }

  async createEvent(evento)
  {
    await EventRepository.createEvent(evento);
    return "Insertado";
  }
  
  async updateEvent(evento)
  {
    await EventRepository.updateEvent(evento);
    return "Actualizado";
  }
  
    
  async deleteEvent(idEvento) {

    await EventRepository.deleteEvent(idEvento);
    return "Eliminado";
  }

  async CambiarRating(idEvento, rating) {
    await EventRepository.UpdateRating(idEvento, rating)
    return "rating actualizado";
  }


  }


