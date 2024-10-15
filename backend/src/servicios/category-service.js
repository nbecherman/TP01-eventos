import { query } from "express";
import categoryRepository from "../repositories/category-repositories.js"
const CategoryRepository= new categoryRepository();
import { Pagination} from "../utils/Paginacion.js";
const PaginacionConfig = new Pagination();
export default class categoryService {

      async allCategorias(limit, offset) {
        const parsedLimit = PaginacionConfig.parseLimit(limit) 
        const parsedOffset = PaginacionConfig.parseOffset(offset)
        const cantidad =  Number.parseInt(await CategoryRepository.cantidadCategorias()); 
        const nextPage=((parsedOffset+1) * parsedLimit<=cantidad) ?`/event-category ?`:"null";
        const paginacion = PaginacionConfig.buildPaginationDto(parsedLimit, parsedOffset, cantidad, nextPage)
        const collection = await CategoryRepository.getAllCategorias(parsedLimit, parsedOffset)
        const collection2 = {collection, paginacion}
        return collection2;
      }

      async getCategoriaById(id) {
        return await CategoryRepository.getCategoriaByID(id);
    }

    async Alltags() {
      return await CategoryRepository.Alltags();
  }

    

        async insertCategoria(Categoria) {
          await CategoryRepository.insertCategory(Categoria);
          return "OK create" 
      }

      async updateCategory(Categoria) {
        return await CategoryRepository.updateCategory(Categoria);
    }
      
      async deleteCategory(id) {
        return await CategoryRepository.deleteCategory(id);
    }
      


} 