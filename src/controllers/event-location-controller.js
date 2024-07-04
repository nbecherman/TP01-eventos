import express from "express";
import eventLocation from "../servicios/eventLocation-service.js";
import authMiddleware from "../auth/authMiddleware.js";

const router = express.Router();
const EventLocation = new eventLocation();






export default router;
