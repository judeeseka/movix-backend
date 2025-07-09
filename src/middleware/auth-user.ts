import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { env } from "../config/env-config";
import { AuthenticatedRequest } from "../interfaces/interface";

export const authenticateUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, env.JWT_SECRET);

        if (typeof decoded !== "object" || !("userId" in decoded)) {
            res.status(401).json({ message: "Invalid token payload" });
            return;
        }

        req.userId = decoded.userId;
        next();
    } catch (error) {
        if (
            error instanceof TokenExpiredError ||
            error instanceof JsonWebTokenError
        ) {
            logger.error("Token is expired or invalid")
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        logger.error("Unexpected error during authentication", {
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : null,
        });

        res.status(500).json({ message: "Internal server error" });
        return
    }
}