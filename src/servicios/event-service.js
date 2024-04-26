import { query } from "express";
//falta hacer el repositorio
//EventRepository()
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

  }


export class eventService1 {
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
  }

export class eventService2 {
  getEventDetail(id) 
  {
    const bd = new EventRepository();
    const resultado =  bd.getEventDetail(id);
    return resultado;
  }
}

export class eventService3 {
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
}}



export class eventService4 {
  createEvent(nuevoEvento)
  {
    const bd = new EventRepository();
    const resultado =  bd.createEvent(nuevoEvento);
    if(resultado != null){
        return true;
    }
    return false;
}
  }


export class eventService5 {
  updateEvent(id, eventoActualizado)
  {
    const bd = new EventsRepository();
    const resultado = bd.updateEvent(id, eventoActualizado);
    if(resultado != null){
        return true;
    }
    return false;
}


  }






