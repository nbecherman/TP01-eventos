export class eventService {
  getAllEvents() {
    console.log("getAllEvents");
    return [
      {
        id: 1,
        name: "evento1",
        price: 10,
      },
    ];
  }
}

export class eventService1 {
  getEventByFilter(pageSize, page, nombre, categoria, fechaI, tag) {
    /*Deberá permitir buscar por nombre, categoria, fecha de inicio o un tag determinado. 
      Para especificar el término de búsqueda o filtros se deberán enviar como parámetros de query.
      Recuerde que puedo filtrar por uno solo o cualquier combinación de los parámetros.*/
   
    //var query 
    return "funciona2";
  }
}

export class eventService2 {
  getEventDetail(id) 
  {
  /*En el detalle deberán listarse todos los atributos del Evento, como así también su localizacion
  completa. Esto incluye la localidad y la provincia donde se encuentra la localización*/

  //var query 
  return "funciona3"
  }
}
export class eventService3 {
getListadoParticipantes(){}


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
