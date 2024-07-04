import express from "express";
import EventController from "./src/controllers/event-controller.js";
import UserController from "./src/controllers/user-controller.js";
import ProvinciasController from "./src/controllers/provincias-controller.js";
import LocationController from "./src/controllers/location-controller.js";
//import CategoryController from "./src/controllers/category-controller.js";


const app = express(); // Init API REST
app.use(express.json()); // Middleware to parse JSON
const port = 3100;

app.use("/event", EventController );
app.use("/user", UserController );
app.use("/provincias", ProvinciasController );  
app.use("/location", LocationController );  
app.use("/event-location", LocationController );  
//app.use("/event-category", CategoryController );  


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  