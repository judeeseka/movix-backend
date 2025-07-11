import { Response } from "express"
import { AuthenticatedRequest } from "../interfaces/interface"
import logger from "../utils/logger"
import sendResponse from "../utils/send-response"
import User from "../models/user"
import Review from "../models/review"
import { validateProfileData } from "../utils/validators"
import { generateUsernameSuggestions } from "../utils/suggest-username"
import { v2 as cloudinary } from "cloudinary"
import { z } from "zod"

type FormData = {
    name?: string;
    username?: string;
    bio?: string;
    preferredGenres?: string[];
    profileImage?: {
        path: string;
        filename: string
    }
}

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

export const updateUserInfo = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { data, error } = validateProfileData(req.body)
        if (error) {
            logger.warn("Validation error", error.message)
            sendResponse({
                res,
                statusCode: 400,
                success: false,
                message: error.message
            })
            return;
        }

        const user = await User.findById(req.userId)

        if (!user) {
            logger.warn("Couldn't find user")
            sendResponse({
                res,
                message: "Couldn't find user",
                statusCode: 400,
                success: false
            })
            return;
        }

        if (data.username === user.username) {
            logger.warn("username already exist");

            const checkUsernameExists = async (username: string) => {
                const exists = await User.exists({ username })
                return Boolean(exists)
            }

            const usernameSuggestions = await generateUsernameSuggestions(data.username, 5, checkUsernameExists)

            if (req.file) {
                const { filename } = req.file as Express.Multer.File
                await cloudinary.uploader.destroy(filename)
            }

            sendResponse({
                res,
                statusCode: 409,
                message: "Username already taken, try another or select from suggestions",
                success: false,
                data: {
                    suggestions: usernameSuggestions
                }
            })
            return;
        }



        if (data.name) user.name = data.name;
        if (data.username) user.username = data.username;
        if (data.bio) user.bio = data.bio;
        if (data.preferredGenres) user.preferredGenres = data.preferredGenres;

        if (req.file) {
            await cloudinary.uploader.destroy(user.profileImage.filename)
            
            const { path, filename } = req.file as Express.Multer.File;
            user.profileImage = { path, filename };
        }

        await user.save();
        sendResponse({
            res,
            success: true,
            message: "User profile updated successfully"
        })
    } catch (error) {
        logger.error("Unable to update user info", {
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