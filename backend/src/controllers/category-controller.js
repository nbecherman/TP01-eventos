  import express from "express";
  import categoryService from "../servicios/category-service.js";
  import authMiddleware from "../auth/authMiddleware.js";

  const router = express.Router();
  const categoriaSrv  = new categoryService();

  router.get("/", async (request, response) => {
      const limit = request.query.limit || 10; // Valor por defecto - registros por pagina
      const offset = request.query.offset||0;  //empieza desde 0 - del 0-10. punto de inicio
      try {
        const allCategorias = await categoriaSrv.allCategorias(limit,offset);
        return response.status(200).json(allCategorias);
      }
      catch(error){
        console.log(error);
      }
    })

    
  router.get("/Alltags", async (request, response) => {
    try {
      const Alltags = await categoriaSrv.Alltags();
      return response.status(200).json(Alltags);
    }
    catch(error){
      console.log(error);
    }
  })

  router.get("/:id", async (request, response) => {
      const id = request.params.id;
      try {
        const categoriaById = await categoriaSrv.getCategoriaById(id);
        if (categoriaById) {
          return response.status(200).json(categoriaById);
        }else{
          return response.status(404).json("No existe la id");
        }
      }
      catch(error){
        console.log(error);
      }
    })


    router.post("/", async (request, response) => {
      const Categoria = {};
      Categoria.name = request.body.name;
      Categoria.display_order = request.body.display_order
      try {
          if (Categoria.name != null) {
              if (Categoria.name.length > 3) {
                  const category = await categoriaSrv.insertCategoria(Categoria);
                  return response.status(201).json(category);
              } else {
                  return response.status(400).json("El nombre tiene menos de 3 letras");
              }
          } else {
              return response.status(400).json("El nombre no existe");
          }
      } catch (error) {
          console.log(error);
          return response.status(500).json(error);
      }
  });


    router.put("/:id",async (request, response) =>{
      const categoria = {};
      categoria.name = request.body.name;
      categoria.display_order = request.body.display_order;
      categoria.id = request.params.id;
      try {
        if (categoria.name) {
          if(categoria.name == null){
              return response.status(400).send("El name es null")
          }
        }
        if (categoria.name ) {
          if (categoria.name.length < 3){
              return response.status(400).send("El name tiene menos de 3 caracteres")
          }
        }  
          const category = await categoriaSrv.updateCategory(categoria);
          console.log(category)
          if (category) {
          return response.status(201).send(category)
          }
          else
          {
          return response.status(404).send("No existe la id")
          } 
    
      } catch (error) {
        console.log(error);
        return res.json(error);
      }
    })
    router.delete("/:id", async (request,response) => {
      const id = request.params.id;
      try {
          const eliminado = await categoriaSrv.deleteCategory(id)
          if (eliminado) {
          return response.status(200).json("eliminado")
          }
          else
          {
          return response.status(404).json("El id se encuentra en uso");
          }
        } catch (error) {
        }
    })  



  export default router;
