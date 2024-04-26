import express from "express";
import {provinciaService,provinciaService2,provinciaService3,provinciaService4,provinciaService5} from "../servicios/provinicias-service.js";

const router = express.Router();

const ProvinciaService = new provinciaService();
const ProvinciaService2 = new provinciaService2();
const ProvinciaService3 = new provinciaService3();
const ProvinciaService4 = new provinciaService4();
const ProvinciaService5 = new provinciaService5();



router.get("/", (request, response) => {
    const { limit, offset } = request.query;

    limit = parseInt(limit); 
    offset = parseInt(offset); 

    if (!isNaN(limit) && !isNaN(offset)) {
    try {
      const AllProvincias = ProvinciaService.getAllProvincias(limit, offset);
      response.json(AllProvincias);
    } catch (error) {
      console.error("Error al obtener todas las provincias:", error);
      return response.json("Un Error");
    }}else {
        return response.json("Los parámetros limit y offset deben ser números.");
      }
  });


    router.post("/", (request, response) => {
        try {
        const nuevaProvincia = request.body; 
        const provinciaCreada = ProvinciaService2.createProvincia(nuevaProvincia);
        return response.json(provinciaCreada);
        } catch (error) {
        console.error("Error al crear una nueva provincia:", error);
        return response.json("Un Error");
        }
    });

    router.put("/:id", (request, response) => {
        const id = request.params.id;
        if (!isNaN(id)) {
        try {
          const provinciaActualizada = request.body; 
          const provinciaModificada = ProvinciaService3.updateProvincia(id,provinciaActualizada);
          return response.json(provinciaModificada);
        } catch (error) {
          console.error("Error al actualizar la provincia:", error);
          return response.json("Un Error");
        }
        } else {
            return response.json("El parámetro ID no cumple con el tipo de dato esperado.");
        }
      });


      router.delete("/:id", (request, response) => {
        const id = request.params.id;
        if (!isNaN(id)) {
        try {
        ProvinciaService4.deleteProvincia(id);
          return response.json("Provincia eliminada exitosamente.");
        } catch (error) {
          console.error("Error al eliminar la provincia:", error);
          return response.json("Un Error");
        }
        } else {
            return response.json("El parámetro ID no cumple con el tipo de dato esperado.");
        }
      });
      


  router.get("/:id",(request,response) =>{
    const id = request.params.id;
    id = parseInt(id);
    if (!isNaN(id)) {
      try {
        const provincia = ProvinciaService5.getProvinciaDetail(id);
        return response.json(provincia);
      } catch (error) {
        console.error("Un Error en el controller", error);
        return response.json("Un Error");
      }
    } else {
      return response.json("El parámetro ID no cumple con el tipo de dato esperado.");
    }
  });

export default router;
