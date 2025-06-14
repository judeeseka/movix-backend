import express from "express";
import { getTrendingMovies } from "../controllers/movie-controller";

const router = express.Router();

router.get("/trending", getTrendingMovies)

export default router;