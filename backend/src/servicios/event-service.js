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
      const collection = await EventRepository.getEventByFilter(Evento, parsedLimit, parsedOffset)
      const collection2 = {collection, paginacion} //arreglado
      return collection2; 
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


  async getAllParticipantes(Evento_Enrrolment)
  {
    const getAllParticipantes = await EventRepository.getAllParticipantes(Evento_Enrrolment);
    console.log(getAllParticipantes)
    return getAllParticipantes;
  }

  async getEnrrolmentsByUserId(id_creator_user)
  {
    const getEnrrolmentsByUserId = await EventRepository.getEnrrolmentsByUserId(id_creator_user);
    return getEnrrolmentsByUserId;
  }
  

  async createEvent(evento)
  {
    const returnEntity = await EventRepository.createEvent(evento);
    return returnEntity;
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



    async getTagsByEvent(idEvento){
      return EventRepository.getTagsByEvent(idEvento);
    }
    
    async getEnrolmentsById(idEvento){
      return EventRepository.getEnrolmentsById(idEvento);
    }

    async getInscriptosAlEvento(idEvento)
    {
      return EventRepository.getInscriptosAlEvento(idEvento)
    }

    async isUserRegistered(idEvento,idUser)
    {
      return EventRepository.isUserRegistered(idEvento,idUser)
    }

    async InscripcionEvento(event_enrollment) {
      const result = await EventRepository.InscripcionEvento(event_enrollment);
      return result ? "Inscripto" : "Error en la inscripción"; 
    }

    async CambiarRating(idEvento, rating) {
      await EventRepository.UpdateRating(idEvento, rating)
      return "rating actualizado";
    }


    async eliminarInscripcion(id,id_user) {
      return EventRepository.eliminarInscripcion(id,id_user)
    }


    async patchEvento(id,id_user,observations,rating) {
      return EventRepository.patchEvento(id,id_user,observations,rating)
    }

    async getEventByEventLocation(id) {
      return EventRepository.getEventByEventLocation(id)
    }

    
  }


