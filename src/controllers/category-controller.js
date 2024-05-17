import express from "express";
import categoryService from "../servicios/category-service.js";

const router = express.Router();

const CategoryService = new categoryService();






export default router;
