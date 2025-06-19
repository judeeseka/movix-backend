import { Request, Response } from "express";
import logger from "../utils/logger";
import sendResponse from "../utils/sendResponse";
import { AxiosError } from "axios";
import tmdbApi from "../config/axios";

export const getTrendingMovies = async (_req: Request, res: Response) => {
    try {
        const {data} = await tmdbApi.get("/trending/all/day");

        logger.info("Trending movies fetched successfully")

        sendResponse({
            res,
            data,
            message: "Trending movies fetched successfully"
        })

    } catch (error) {
        logger.error("Failed to fetch trending movies", {
            error: (error instanceof AxiosError) ? error.message : error,
            stack: error instanceof AxiosError ? error.stack : null
        })
        sendResponse({
            res,
            statusCode: 500,
            success: false,
            message: "Failed to fetch trending movies"
        })
    }
}

export const getPopularMovies = async (_req: Request, res: Response) => {
    try {

        const {data} = await tmdbApi.get("/movie/popular")
        logger.info("Popular movies fetched successfully")

        sendResponse({
            res,
            data,
            message: "Popular movies fetched successfully"
        })
        
    } catch (error) {
        logger.error("Failed to fetch popular movies", {
            error: (error instanceof AxiosError) ? error.message : error,
            stack: error instanceof AxiosError ? error.stack : null
        })
        sendResponse({
            res,
            statusCode: 500,
            success: false,
            message: "Failed to fetch popular movies"
        })
    }
}

export const getTopRatedMovies = async (_req: Request, res: Response) => {
    try {

        const {data} = await tmdbApi.get("/movie/top_rated")
        logger.info("Top rated movies fetched successfully")

        sendResponse({
            res,
            data,
            message: "Top rated movies fetched successfully"
        })
        
    } catch (error) {
        logger.error("Failed to fetch top rated movies", {
            error: (error instanceof AxiosError) ? error.message : error,
            stack: error instanceof AxiosError ? error.stack : null
        })
        sendResponse({
            res,
            statusCode: 500,
            success: false,
            message: "Failed to fetch top rated movies"
        })
    }
}