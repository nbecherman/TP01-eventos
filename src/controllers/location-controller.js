/*import express from "express";
import locationService from "../servicios/location-service.js";
const router = express.Router();
const LocationService = new locationService();

    router.get("/", async (req, res) => { //todas las locations
        const pageSize = req.query.pageSize;
        const reqPage = req.query.reqPage;
        try {
          const Localidades = await LocationService.getLocalidades(pageSize, reqPage);
          return res.status(200).json(Localidades); //200
        } catch (error) {
          return res.json(error);
        }
    });*/
    


export default router;
