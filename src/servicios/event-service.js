export class eventService {
  getAllEvents(limit, offset) {
    const resultado = Bd.getAllEvents(pageSize, requestedPage);
    

  }
}

export class eventService1 {
  getEventByFilter(pageSize, page, nombre, categoria, fechaI, tag) {
    return "funciona2";
  }
}

export class eventService2 {
  getEventDetail(id) 
  {
  return "funciona3"
  }
}

export class eventService3 {
getAllParticipantes(pageSize,page,id,username,first_name,last_name,attended,rating,description)
{
  return "funciona4"
}}



export class eventService4 {
  createEvento(nuevoEvento)
  {
    return "funciona"
  }
}

export class eventService5 {
  updateEvento(eventoModificado)
  {
    return "funciona"
  }
}




/* const query = `select * from events limit ${pageSize} offset ${requestedPage}`;
        const query2 = `select count(*) from events`
        throw new Error("Error en el servicio");

        return{
            collection: query,
            pagination:{
                limit: pageSize,
                offset: requestedPage,
                nextPage: "http://localhost:3000/event?limit=${pageSize}&offset=${requestedPage + 1}",
            total: query2,
            },
        };*/
