import express from "express";
import { getAllMovies, getMovieDetails, getMovieRecommendations, getMovieReviews, getPopularMovies, getTopRatedMovies, getTrendingMovies } from "../controllers/movie-controller";

const router = express.Router();

router.get("/trending", getTrendingMovies)
router.get("/popular", getPopularMovies)
router.get("/top-rated", getTopRatedMovies)
router.get("/discover", getAllMovies)
router.get("/:id/details", getMovieDetails)
router.get("/:id/reviews", getMovieReviews)
router.get("/:id/recommendations", getMovieRecommendations)

export default router;