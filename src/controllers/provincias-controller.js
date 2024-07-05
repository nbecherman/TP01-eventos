import express from "express";
import provinciaService from "../servicios/provinicias-service.js";
import locationService from "../servicios/location-service.js";

const router = express.Router();

const ProvinciaService = new provinciaService();
const LocationService = new locationService();



router.get("/", async (request, response) => {
  const limit = request.query.limit || 10; // Valor por defecto - registros por pagina
  const offset = request.query.offset||0;  //empieza desde 0 - del 0-10. punto de inicio
  try {
      const provincias = await ProvinciaService.getAllProvincias(limit, offset);
      return response.json(provincias);
  } catch (error) {
      console.error("Un Error en el controller", error);
      return response.status(500).json({ error: "Un Error" });
  }
});


router.get("/:id",async (request,response) =>{   //terminado (:
  let id = request.params.id;

  if (!isNaN(id)) {
    try {
      const provinciaById = await ProvinciaService.getProvinciaDetail(id);
      if (provinciaById) {
        return response.status(200).json(provinciaById);
      }
      else
      {
        return response.status(404).send("no existe la provincia"); 
      }
    } catch (error) {
      console.error("Un Error en el controller", error);
      return response.json("Un Error");
    }
  } else {
    return response.json("El parámetro ID no cumple con el tipo de dato esperado.");
  }
});

router.get("/:id/locations", async (request, response) => {
  const limit = request.query.limit || 10; // Valor por defecto - registros por pagina
  const offset = request.query.offset|0;  //empieza desde 0 - del 0-10. punto de inicio
  const id_provincia=request.params.id
  try {
    const localidades = await ProvinciaService.getLocalidadesByProvincia(id_provincia,limit,offset);
    if (localidades) {
      return response.status(200).json(localidades);
    }else{
      return response.status(404).json("No existe la id");

    }
  } catch (error) {
    console.log(error);
    return response.json(error);
  }
});


router.post("/",async (request, response) =>{
  const Provincia={}
  Provincia.name=request.body.name
  Provincia.full_name=request.body.full_name
  Provincia.latitude=request.body.latitude
  Provincia.longitude=request.body.longitude
  let id = request.params.id;
  try {
    if(Provincia.name && Provincia.full_name&& Provincia.latitude && Provincia.longitude){

      if(!isNaN(Provincia.latitude) && !isNaN(Provincia.longitude)){
        if(Provincia.name.length>3){

          const provincia = await ProvinciaService.createProvincia(Provincia);
          return response.status(201).json(provincia);
        }else{
          return response.status(400).send("La provinicia tiene menos de 3 letras");
        }
      }else{
        return response.status(400).send("Latitude o longitud no son numeros");
      }
    }else{
      return response.status(400).send("Faltan datos para crear la provinicia");
    }
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
})

router.put("/",async (request, response) =>{
  const Provincia={}
  Provincia.id=request.body.id
  Provincia.name=request.body.name
  Provincia.full_name=request.body.full_name
  Provincia.latitude=request.body.latitude
  Provincia.longitude=request.body.longitude

  try {
    if (Provincia.latitude) {
      if(!isNaN(Provincia.latitude)){
      }else{
        return response.status(400).send("Latitude no es un numero");
      } 
    }
    if (Provincia.longitude ) {
      if(!isNaN(Provincia.longitude)){ 
      }else{
        return response.status(400).send("Longitud no es un numero");
      } 
    }
    if(Provincia.name)
      {
        if(Provincia.name.length<3)
          {
            return response.status(400).send("La provinicia tiene menos de 3 letras");
    
          }
      }
      
      const provincia = await ProvinciaService.updateProvincia(Provincia);
      if (provincia) {
      return response.status(201).send("actualiazo")
      }
       else
       {
      } return response.status(404).send("No existe la id")

  } catch (error) {
    console.log(error);
    return response.json(error);
  }
})

  router.delete("/:id" , async (request, response) => {
  const id = request.params.id;
  try {
    const provinicia=await ProvinciaService.getProvinciaDetail(id)
    const locations = await LocationService.getLocationByProvince(id);
    if(provinicia){
      if(locations==null)
      {        
        const eliminado=await ProvinciaService.deleteProvincia(id);
        return response.status(200).send(eliminado);
      }
      else
      {
        return response.status(403).send("No se puede eliminar porque tiene localidades")
      }
    }else{
      return response.status(404).send("No existe una provincia con esa id");
    }
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});


 

export default router;
