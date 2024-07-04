import { query } from "express";
import eventLocationRepository from "../repositories/event-location-repository.js"
const EventLocation= new eventLocationRepository();
import { Pagination} from "../utils/Paginacion.js";
const PaginacionConfig = new Pagination();

export default class eventLocation
{


}