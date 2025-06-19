import express from "express";
import { getPopularSeries, getTopRatedSeries } from "../controllers/series-controller";
const router = express.Router();

router.get("/popular", getPopularSeries)
router.get("/top-rated", getTopRatedSeries)

export default router