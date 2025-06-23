import { Request, Response } from "express";
import logger from "../utils/logger";
import sendResponse from "../utils/send-response";
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

export const getAllMovies = async (req: Request, res: Response) => {
    try {
        const {data} = await tmdbApi.get("/discover/movie", {
            params: {
                ...req.query
            }
        } );
        logger.info("fetching all movies")

        sendResponse({
            res,
            data,
        })
    } catch (error) {
        logger.error("Failed to fetch all movies", {
            error: (error instanceof AxiosError) ? error.message : error,
            stack: error instanceof AxiosError ? error.stack : null
        })
        sendResponse({
            res,
            statusCode: 500,
            success: false,
            message: "Failed to fetch all movies"
        })
    }
}

export const getMovieDetails = async (req: Request, res: Response) => {
    const {id} = req.params;
    try {
        const [details, casts] = await Promise.all([
            tmdbApi.get(`/movie/${id}`),
            tmdbApi.get(`/movie/${id}/credits`),
        ])

        logger.info(`movie info with id: ${id} fetched successfully`)
        
        const data = {
            details: details.data,
            casts: casts.data,
        }

        sendResponse({
            res,
            data
        })
        
    } catch (error) {
        logger.error("Failed to fetch movie details", {
            error: (error instanceof AxiosError) ? error.message : error,
            stack: error instanceof AxiosError ? error.stack : null
        })
        sendResponse({
            res,
            statusCode: 500,
            success: false,
            message: "Failed to fetch movie details"
        })
    }
}

export const getMovieReviews = async (req: Request, res: Response) => {
    const {id} = req.params;

    try {
        const response = await tmdbApi.get(`/movie/${id}/reviews`, {
            params: {
                ...req.query
            }
        })

        logger.info(`movie reviews with id: ${id} fetched successfully`)

        sendResponse({
            res,
            data: response.data
        })
        
    } catch (error) {
        logger.error(`Failed to fetch movie review for id: ${id}`, {
            error: (error instanceof AxiosError) ? error.message : error,
            stack: error instanceof AxiosError ? error.stack : null
        })
        sendResponse({
            res,
            statusCode: 500,
            success: false,
            message: `Failed to fetch movie review for id: ${id}`
        })
    }
}

export const getMovieRecommendations = async (req: Request, res: Response) => {
    const {id} = req.params;

    try {
        const response = await tmdbApi.get(`/movie/${id}/recommendations`, {
            params: {
                ...req.query
            }
        })

        logger.info(`movie recommendations for id: ${id} fetched successfully`)

        sendResponse({
            res,
            data: response.data
        })
        
    } catch (error) {
        logger.error(`Failed to fetch movie recommendations for id: ${id}`, {
            error: (error instanceof AxiosError) ? error.message : error,
            stack: error instanceof AxiosError ? error.stack : null
        })
        sendResponse({
            res,
            statusCode: 500,
            success: false,
            message: `Failed to fetch movie recommendations for id: ${id}`
        })
    }
}