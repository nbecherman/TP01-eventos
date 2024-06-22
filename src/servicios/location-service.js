import { query } from "express";
import locationRepository from "../repositories/location-repositories.js"
const LocationRepository= new locationRepository();

export default class eventLocation
{
async getEventLocationById(id)
{
    const getEventLocationById = await LocationRepository.getEventLocationById(id);
    return getEventLocationById;
}    
}
