import express from "express";
import cors from "cors"; // Importa el paquete cors

import EventController from "./src/controllers/event-controller.js";
import UserController from "./src/controllers/user-controller.js";
import ProvinciasController from "./src/controllers/provincias-controller.js";
import LocationController from "./src/controllers/location-controller.js";
import CategoryController from "./src/controllers/category-controller.js";
import EventLocationController from "./src/controllers/event-location-controller.js";


const app = express(); // Init API REST
app.use(cors()); // Habilita CORS para todas las rutas
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

  

