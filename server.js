import express from "express";
import EventController from "./src/controllers/event-controller.js";
import UserController from "./src/controllers/user-controller.js";
import ProvinciasController from "./src/controllers/provincias-controller.js";
import LocationController from "./src/controllers/location-controller.js";
import CategoryController from "./src/controllers/category-controller.js";
import EventLocationController from "./src/controllers/event-location-controller.js";


const app = express(); // Init API REST
app.use(express.json()); // Middleware to parse JSON
const port = 3100;

app.use("/api/event", EventController );
app.use("/api/user", UserController );
app.use("/api/province", ProvinciasController );  
app.use("/api/location", LocationController );  
app.use("/api/event-location", EventLocationController);  
app.use("/api/event-category", CategoryController );  


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  

  /*
La documentacion de Postman tendria que estar en el repositorio, no en su cuenta y compartirme las credenciales.
No agregaron el /api en ninguno de los endpoints. OK
El get all eventos me devuelve eventos repetidos, 2 veces el ID  1 y 2 veces el ID 2. OK
Si los filtros no matchean me devuelve un objeto vacio, la paginacion y la colleccion no son opcionales, tienen que estar siempre y a lo sumo el array de la collection está vacio.
El total de la paginacion no se condice con la cantidad reales de elementos que se cumplen con los filtros. Y ademas si quiero filtrar por un evento en particular no me lo trae, revisen como joinean con otras tablas.
Cuando quiero editar un evento me tira error de que la asistencia es mayor a la capacidad cuando esto no es verdad. OK fijar el restp

Cuando trato de ratear un evento me tira un error de que ya sucedio, lo cual tiene sentido si quiero hacer un rating de que me parecio el evento, no? ok
El endpoint de Province le pusieron Provincias.OK
Cuando quiero editar una provincia me tira error de que tiene menos letras. 
 

Revisen esto y entreguen de nuevo antes del sabado al medio dia.

  */