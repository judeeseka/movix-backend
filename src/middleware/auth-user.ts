import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";
import jwt from "jsonwebtoken";
import { env } from "../config/env-config";
import { AuthenticatedRequest } from "../interfaces/interface";

export const authenticateUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
        res.status(401).json({
            message: "Unauthorized"
        })
        return;
    }

    try {
        const decoded = jwt.verify(token, env.JWT_SECRET)
        
        if (typeof decoded === "string" || !("userId" in decoded)) {
            res.status(401).json({ message: "Invalid token payload" });
            return
          }

        req.userId = decoded.userId
        next()
        
    } catch (error) {
        logger.error("Failed to authenticate user", {
            error: (error instanceof Error) ? error.message : error,
            stack: error instanceof Error ? error.stack : null
        })

        res.status(500).json({
            message: "Internal server error"
        })
    }
}