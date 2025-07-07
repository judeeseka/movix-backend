import { Response } from "express"
import { AuthenticatedRequest } from "../interfaces/interface"
import logger from "../utils/logger"
import sendResponse from "../utils/send-response"
import User from "../models/user"
import Review from "../models/review"

export const getUserInfo = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const [users, reviews] = await Promise.all([
            User.findById(req?.userId).select("-password").lean(),
            Review.aggregate([
                {
                    $match: {
                        userId: req.userId
                    }
                },
                {
                    $group: {
                        _id: "$userId",
                        totalReviews: {
                            $sum: 1
                        },
                        avgRating: {
                            $avg: "$rating"
                        }
                    }
                }
            ])
        ])

        logger.warn("User information fetched successfully")

        sendResponse({
            res,
            message: "User information fetched successfully",
            data: {
                ...users,
                totalReviews: reviews[0]?.totalReviews || 0,
                averageRating: reviews[0]?.averageRating || 0
            }
        })
        
    } catch (error) {
        logger.error("Unable to get user info", {
            message: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : ""
        })

        sendResponse({
            res,
            success: false,
            statusCode: 500,
            message: "Internal server error"
        })
    }
}