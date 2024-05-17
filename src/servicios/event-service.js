import { query } from "express";
import eventRepository from "../repositories/event-repositories.js"
const EventRepository= new eventRepository();

export class eventService {
  getAllEvents(limit, offset) {

    const bd = new EventRepository();
    const eventos = await bd.getAllEvents();
    const resultado = {
        
            collection: eventos,
            pagination:
                {
                    limit: limit,
                    offset: offset,
                    nextPage: http://localhost:3000${nextPage},
                    total: eventos.length
                }
            };
    return resultado;
    }




  getEventByFilter(pageSize, page, nombre, categoria, fechaI, tag) {
    const bd = new EventRepository();
    const eventos = await bd.getEventByFilter(pageSize, page, nombre, categoria, fechaI, tag);
    const resultado = {
        
            collection: eventos,
            pagination:
                {
                    limit: limit,
                    offset: offset,
                    nextPage: http://localhost:3000${nextPage},
                    total: eventos.length
                }
            };
    return resultado;
    }
  

  getEventDetail(id) 
  {
    const bd = new EventRepository();
    const resultado =  bd.getEventDetail(id);
    return resultado;
  }


getAllParticipantes(pageSize,page,id,username,first_name,last_name,attended,rating,description)
{
  const bd = new EventRepository();
  const participants =  bd.getAllParticipantes(id, mensajeCondicion);
  const resultado = {
  
      collection: participants,
      pagination:
          {
              limit: limit,
              offset: offset,
              nextPage: `http://localhost:3000${nextPage}`,
              total: eventos.length
          }
  };
  return resultado;
}



  createEvent(nuevoEvento)
  {
    const bd = new EventRepository();
    const resultado =  bd.createEvent(nuevoEvento);
    if(resultado != null){
        return true;
    }
    return false;
}
  


  updateEvent(id, eventoActualizado)
  {
    const bd = new EventRepository();
    const resultado = bd.updateEvent(id, eventoActualizado);
    if(resultado != null){
        return true;
    }
    return false;
}


  }


  //const response = { collection : events , pagination : { limit : parsedLimit , offset : parsedOffset , nextPage : (( parsedOffset + 1 ) * parsedLimit <= totalCount ) ? ` ${ process . env . BASE_URL } / ${ path } ?limit= ${ parsedLimit } &offset= ${ parsedOffset + 1 }${ ( eventName ) ? `&eventName= ${ eventName } ` : null}${ ( eventCategory ) ? `&eventCategory= ${ eventCategory } `` : null} ${ ( eventDate ) ? `&eventDate= ${ eventDate } ` : null}${ ( eventTag ) ? `&eventTag= ${ eventTag } ` : null} ` : null , total : totalCount , }