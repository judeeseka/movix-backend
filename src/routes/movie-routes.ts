import express from "express";
import { getAllMovies, getPopularMovies, getTopRatedMovies, getTrendingMovies } from "../controllers/movie-controller";

const router = express.Router();

router.get("/trending", getTrendingMovies)
router.get("/popular", getPopularMovies)
router.get("/top-rated", getTopRatedMovies)
router.get("/discover", getAllMovies)

export default router;