import { query } from "express";
import provinceRepository from "../repositories/province-repositories.js"
const ProvinceRepository= new provinceRepository();

export default class provinciaService {
    
    async getAllProvincias(limit, offset){
      
          const getAllProvincias = await ProvinceRepository.getAllProvincias(limit, offset);
          return getAllProvincias;
          }
    

          async getProvinciaDetail(id)
          {
            const getProvinciaDetail = await ProvinceRepository.getProvinciaDetail(id);
            return resultado;
          }  

          async createProvincia(nuevaProvincia)
          {
            const createProvincia = await ProvinceRepository.createProvincia(nuevaProvincia);
            return "create";
          }
    

            async updateProvincia(id,provinciaActualizada)
            {
                  const updateProvincia = await ProvinceRepository.updateProvincia(id,provinciaActualizada);
                  return "actualizado";
            }

          async deleteProvincia(id)
          {
            const ProvinceRepository = await ProvinceRepository.deleteProvincia(id);
            return "eliminado";
          }  



  }
