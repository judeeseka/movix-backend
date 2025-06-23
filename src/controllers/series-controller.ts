import { Request, Response } from "express";
import logger from "../utils/logger";
import { AxiosError } from "axios";
import sendResponse from "../utils/send-response";
import tmdbApi from "../config/axios";

export const getPopularSeries = async(_req: Request, res: Response) => {
    try {
        const {data} = await tmdbApi.get("/tv/popular")

        logger.info("Popular series fetched successfully");

        sendResponse({
            res,
            data,
            message: "Popular series fetched successfully"
        })
        
    } catch (error) {
        logger.error("Failed to fetch popular series", {
            error: (error instanceof AxiosError) ? error.message : error,
            stack: error instanceof AxiosError ? error.stack : null
        })
        sendResponse({
            res,
            statusCode: 500,
            success: false,
            message: "Failed to fetch popular series"
        })
    }
}
export const getTopRatedSeries = async(_req: Request, res: Response) => {
    try {
        const {data} = await tmdbApi.get("/tv/top_rated")

        logger.info("Top rated series fetched successfully");

        sendResponse({
            res,
            data,
            message: "Top rated series fetched successfully"
        })
        
    } catch (error) {
        logger.error("Failed to fetch top rated series", {
            error: (error instanceof AxiosError) ? error.message : error,
            stack: error instanceof AxiosError ? error.stack : null
        })
        sendResponse({
            res,
            statusCode: 500,
            success: false,
            message: "Failed to fetch top rated series"
        })
    }
}

export const getAllSeries = async (req: Request, res: Response) => {
    try {
        const {data} = await tmdbApi.get("/discover/tv", {
            params: {
                ...req.query
            }
        } );
        logger.info("fetching all tv series")

        sendResponse({
            res,
            data,
        })
    } catch (error) {
        logger.error("Failed to fetch all tv series", {
            error: (error instanceof AxiosError) ? error.message : error,
            stack: error instanceof AxiosError ? error.stack : null
        })
        sendResponse({
            res,
            statusCode: 500,
            success: false,
            message: "Failed to fetch all tv series"
        })
    }
}