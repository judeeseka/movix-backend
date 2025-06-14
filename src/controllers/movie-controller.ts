import { Request, Response } from "express";
import axiosApi from "../config/axios";
import logger from "../utils/logger";
import sendResponse from "../utils/sendResponse";
import { AxiosError } from "axios";

export const getTrendingMovies = async (_req: Request, res: Response) => {
    try {
        const {data} = await axiosApi.get("/trending/all/day");

        logger.info("Trending movies fetched successfully")

        sendResponse({
            res,
            data
        })

    } catch (error) {
        logger.error("Failed to fetch movies", {
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