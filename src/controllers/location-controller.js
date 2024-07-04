import express, { request, response } from "express"; // Importa el módulo express
import LocalidadService  from "../servicios/location-service.js"; // Importa el servicio de localidades
import AuthMiddleware from "../auth/authMiddleware.js"; // Importa el middleware de autenticación

const localidadService = new LocalidadService(); // Crea una nueva instancia del servicio de localidades
const router = express.Router(); // Crea una nueva instancia del router de express

// Ruta para obtener todas las localidades con paginación
router.get("/", async (request, response) => {
  const limit = request.query.limit || 10; // Valor por defecto - registros por pagina
  const offset = request.query.offset||0;  //empieza desde 0 - del 0-10. punto de inicio
    try {
        const localidades = await localidadService.getLocalidades(limit, offset); // Llama al servicio para obtener las localidades
        return response.status(200).json(localidades); // Responde con las localidades obtenidas
    } catch (error) {
        console.log(error); // Imprime el error en la consola
        return response.status(500).json(error); // Responde con el error
    }
});

// Ruta para obtener una localidad por su ID
router.get("/:id", async (request, response) => {
    const id = request.params.id; // Obtiene el ID de los parámetros de la ruta
    try {
        const localidad = await localidadService.getLocalidadById(id); // Llama al servicio para obtener la localidad por ID
        if (localidad != null) { // Si la localidad existe
            return response.status(200).json(localidad); // Responde con la localidad obtenida
        } else { // Si la localidad no existe
            return response.status(404).json("ID no existe"); // Responde con un mensaje de error
        }
    } catch (error) {
        console.log(error); // Imprime el error en la consola
        return response.status(500).json(error); // Responde con el error
    }
});

// Ruta para obtener eventos en una localidad específica, protegida por autenticación
router.get("/:id/event-location", AuthMiddleware, async (request, response) => {
    const id_location = request.params.id; // Obtiene el ID de los parámetros de la ruta
    const limit = request.query.limit || 10; // Obtiene el límite de resultados de la query string
    const offset = request.query.offset||0; // Obtiene el offset de resultados de la query string
    try {
        const localidad = await localidadService.getLocalidadById(id_location); // Verifica si la localidad existe
        if (localidad != null) {
            const eventos = await localidadService.getEvLocByLocalidad(id_location, limit, offset); // Llama al servicio para obtener los eventos en la localidad
            return response.status(200).json(eventos); // Responde con los eventos obtenidos
        } else {
            return response.status(404).json("Localidad no existe"); // Responde con un mensaje de error
        }
    } catch (error) {
        console.log(error); // Imprime el error en la consola
        return response.status(500).json(error); // Responde con el error
    }
});

export default router; // Exporta el router para su uso en otras partes de la aplicación


