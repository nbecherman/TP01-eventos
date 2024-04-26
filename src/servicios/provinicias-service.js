
import { query } from "express";
//hacer repositorio
//ProvinceRepository()
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
    }  


export class provinciaService2 {
  createProvincia(nuevaProvincia)
  {
    const bd = new ProvinceRepository();
    const resultado = bd.createProvincia(nuevaProvincia);
    if(resultado != null){
        return true;
    }
    return false;
}
  }  

export class provinciaService3 {
  updateProvincia(id,provinciaActualizada)
  {
    const bd = new ProvinceRepository();
        const resultado = bd.updateProvincia(id,provinciaActualizada);
        if(resultado != null){
            return true;
        }
        return false;
    }

  }  


export class provinciaService4 {
  deleteProvincia(id)
  {
    const bd = new ProvinceRepository();
    return bd.deleteProvincia(id);
  }  
}

export class provinciaService5 {
  getProvinciaDetail(id)
  {
    const bd = new ProvinceRepository();
    const resultado = bd.getProvinciaDetail(id);
    return resultado;
  }  
}
