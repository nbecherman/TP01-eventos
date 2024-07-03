import { query } from "express";
import provinceRepository from "../repositories/province-repositories.js"
const ProvinceRepository= new provinceRepository();
import { Pagination} from "../utils/Paginacion.js";
const PaginacionConfig = new Pagination();
import locationService from "../repositories/location-repositories.js";
const LocationService = new locationService();

export default class provinciaService {
    
         
          async getAllProvincias(limit, offset) {
            const parsedLimit = PaginacionConfig.parseLimit(limit) 
            const parsedOffset = PaginacionConfig.parseOffset(offset)
            const cantidad =  Number.parseInt(await ProvinceRepository.cantidadProvinciasPag()); //cantidad de eventos
            const nextPage=((parsedOffset+1) * parsedLimit<=cantidad) ?`/provincias ?`:"null"
            const paginacion = PaginacionConfig.buildPaginationDto(parsedLimit, parsedOffset, cantidad, nextPage)
            const getProvincia = await ProvinceRepository.getProvincias(parsedLimit, parsedOffset)
            if (getProvincia!=null) {
              const collection = {getProvincia, paginacion}
              return collection;
            }else{
              return {getProvincia}
            }  
          }

          async getProvinciaDetail(id)
          {
            const getProvinciaDetail = await ProvinceRepository.getProvinciaDetail(id);
            return getProvinciaDetail;
          }  

          
          async getLocalidadesByProvincia(id_provincia,limit, offset) {
            const parsedLimit = PaginacionConfig.parseLimit(limit) 
            const parsedOffset = PaginacionConfig.parseOffset(offset)
            const cantidad =  Number.parseInt(await ProvinceRepository.cantidadProvinciasPag()); //cantidad de eventos
            const nextPage=((parsedOffset+1) * parsedLimit<=cantidad) ?`/province/${id_provincia}/locations`:"null";
            const paginacion = PaginacionConfig.buildPaginationDto(parsedLimit, parsedOffset, cantidad, nextPage)
            const getlocalidades = await LocationService.getLocalidadesByProvincia(id_provincia,parsedLimit, parsedOffset)
            const collection = {getlocalidades, paginacion}
            return collection;
    
          }

          async createProvincia(nuevaProvincia)
          {
            const createProvincia = await ProvinceRepository.createProvincia(nuevaProvincia);
            return "create";
          }
    

            async updateProvincia(iprovinciaActualizada)
            {
                  const updateProvincia = await ProvinceRepository.updateProvincia(iprovinciaActualizada);
                  return "actualizado";
            }

          async deleteProvincia(id)
          {
            const deleteProvincia = await ProvinceRepository.deleteProvincia(id);
            return "eliminado";
          }  



  }
