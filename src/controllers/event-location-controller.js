import express from "express";
import eventLocation from "../servicios/eventLocation-service.js";

const router = express.Router();
const EventLocation = new eventLocation();






export default router;
