import { query } from "express";
import eventRepository from "../repositories/event-repositories.js"
const EventRepository= new eventRepository();

export default class eventService {
 

  async getEventByFilter(Evento, pageSize, page) 
    {
    const getEventByFilter = await EventRepository.getEventByFilter(Evento, pageSize, page);
    return getEventByFilter;
    }
  

  async getEventDetail(id) 
  {
    const getEventDetail = await EventRepository.getEventDetail(id);
    return getEventDetail;
  }


  async getAllParticipantes(pageSize,page,id,username,first_name,last_name,attended,rating,description)
  {
    const getAllParticipantes = await EventRepository.getAllParticipantes(id, mensajeCondicion);
    return getAllParticipantes;
  }

  async createEvent(nuevoEvento)
  {
    await EventRepository.createEvent(nuevoEvento);
    return "Insertado";
  }
  
  async updateEvent(id, eventoActualizado)
  {
    await EventRepository.updateEvent(id, eventoActualizado);
    return "Actualizado";
  }
  
  async CambiarRating(idEvento, rating) {
    await EventRepository.UpdateRating(idEvento, rating)
    return "rating actualizado";
  }
  
  async InsertEvento(evento) {

    await EventRepository.InscripcionEvento(evento);
    return "insertado con exito";
  }

  }


