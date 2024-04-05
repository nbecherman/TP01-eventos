export class eventService{
    
        getAllEvents(){
        
        console.log("getAllEvents")
            return(
                [
                    {
                        id: 1,
                        name: "evento1",
                        price: 10,

                    }
                ]
            )
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


