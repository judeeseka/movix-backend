import express from "express";
import { getPopularMovies, getTopRatedMovies, getTrendingMovies } from "../controllers/movie-controller";

const router = express.Router();

router.get("/trending", getTrendingMovies)
router.get("/popular", getPopularMovies)
router.get("/top-rated", getTopRatedMovies)

export default router;