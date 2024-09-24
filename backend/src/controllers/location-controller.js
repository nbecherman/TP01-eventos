import express, { request, response } from "express"; 
import LocalidadService  from "../servicios/location-service.js"; 
import AuthMiddleware from "../auth/authMiddleware.js"; 

const localidadService = new LocalidadService(); 
const router = express.Router(); 

router.get("/", async (request, response) => {
  const limit = request.query.limit || 10; // Valor por defecto - registros por pagina
  const offset = request.query.offset||0;  //empieza desde 0 - del 0-10. punto de inicio
    try {
        const localidades = await localidadService.getLocalidades(limit, offset); 
        return response.status(200).json(localidades); 
    } catch (error) {
        console.log(error); 
        return response.status(500).json(error); 
    }
});

router.get("/:id", async (request, response) => {
    const id = request.params.id; 
    try {
        const localidad = await localidadService.getLocalidadById(id); 
        if (localidad != null) { 
            return response.status(200).json(localidad);
        } else { // Si la localidad no existe
            return response.status(404).json("ID no existe"); 
        }
    } catch (error) {
        console.log(error); 
        return response.status(500).json(error); 
    }
});

router.get("/:id/event-location", AuthMiddleware, async (request, response) => {
    const id_location = request.params.id; 
    const limit = request.query.limit || 10; 
    const offset = request.query.offset||0;
    try {
        const localidad = await localidadService.getLocalidadById(id_location); 
        if (localidad != null) {
            const eventos = await localidadService.getEvLocByLocalidad(id_location, limit, offset);
            return response.status(200).json(eventos); 
        } else {
            return response.status(404).json("Localidad no existe"); 
        }
    } catch (error) {
        console.log(error); 
        return response.status(500).json(error); 
    }
});

export default router; 


