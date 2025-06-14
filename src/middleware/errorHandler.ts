import { NextFunction, Request, Response } from "express"
import logger from "../utils/logger"

interface CustomError extends Error {
    statusCode: number
}

const errorHandler = (
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    logger.error(err.stack || err.message)
  
    res.status(err.statusCode).json({
        message: err.message || "Internal server error"
    })
  }
  
  export default errorHandler