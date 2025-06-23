import { Request, Response } from "express";
import logger from "../utils/logger";
import { AxiosError } from "axios";
import sendResponse from "../utils/send-response";
import tmdbApi from "../config/axios";

export const searchMulti = async (req: Request, res: Response) => {
    const {query} = req.query;
    try {
        const response = await tmdbApi.get("/search/multi", {
            params: {
                query
            }
        })

        logger.info(`results for query: ${query} fetched`)

        sendResponse({
            res,
            data: response.data
        })
        
    } catch (error) {
        logger.error("Failed to fetch search results", {
            error: (error instanceof AxiosError) ? error.message : error,
            stack: error instanceof AxiosError ? error.stack : null
        })
        sendResponse({
            res,
            statusCode: 500,
            success: false,
            message: "Failed to fetch search results"
        })
    }
}