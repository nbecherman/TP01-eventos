import { query } from "express";
import provinceRepository from "../repositories/event-repositories.js"
const ProvinceRepository= new provinceRepository();

export class provinciaService {
    getAllProvincias(limit, offset){
    
        const bd = new ProvinceRepository();
        const provincias = await bd.getAllProvincias();
        const resultado = {
            
                collection: provincias,
                pagination:
                    {
                        limit: limit,
                        offset: offset,
                        nextPage: http://localhost:3000${nextPage},
                        total: provincias.length
                    }
                };
        return resultado;
        }
   


  createProvincia(nuevaProvincia)
  {
    const bd = new ProvinceRepository();
    const resultado = bd.createProvincia(nuevaProvincia);
    if(resultado != null){
        return true;
    }
    return false;
}
   

  updateProvincia(id,provinciaActualizada)
  {
    const bd = new ProvinceRepository();
        const resultado = bd.updateProvincia(id,provinciaActualizada);
        if(resultado != null){
            return true;
        }
        return false;
    }

  


  deleteProvincia(id)
  {
    const bd = new ProvinceRepository();
    return bd.deleteProvincia(id);
  }  


  getProvinciaDetail(id)
  {
    const bd = new ProvinceRepository();
    const resultado = bd.getProvinciaDetail(id);
    return resultado;
  }  
}
