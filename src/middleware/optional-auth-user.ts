import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env-config";
import { AuthenticatedRequest } from "../interfaces/interface";

export const optionalAuthUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader?.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];

        try {
            const decoded = jwt.verify(token, env.JWT_SECRET) as jwt.JwtPayload;
            req.userId = decoded.userId;
        } catch (err) {
            req.userId = undefined;
        }
    }

    next()
}