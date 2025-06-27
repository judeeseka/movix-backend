import { Request, Response } from "express";
import { validateLoginData, validateOnboardingData, validateRegistrationData } from "../utils/validators";
import logger from "../utils/logger";
import sendResponse from "../utils/send-response";
import User from "../models/user";
import { generateToken } from "../utils/generate-token";
import { env } from "../config/env-config";
import RefreshToken from "../models/refresh-token";
import { AuthenticatedRequest, IUser } from "../interfaces/interface";

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { data, error } = validateRegistrationData(req.body)
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

        const { email, password, name, username } = data;

        let user = await User.findOne({
            $or: [{ email }, { username }]
        })

        if (user) {
            const isEmail = user.email === email
            const isUsername = user.username === username
            const message = isEmail && isUsername ? "Email and username already used" : isEmail ? "email already used" : "username already used"

            logger.warn(message)
            sendResponse({
                res,
                statusCode: 400,
                success: false,
                message
            })
            return;
        }

        user = new User({
            email,
            name,
            username,
            password
        })

        await user.save();

        const { accessToken, refreshToken } = await generateToken(user)

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: env.NODE_ENV === "production" ? true : false,
            sameSite: env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 3 * 24 * 60 * 60 * 1000
        });


        sendResponse({
            res,
            statusCode: 201,
            message: "Registration successful, proceed to onboarding.",
            data: {
                userId: user._id,
                username: user.username,
                token: accessToken,
                isOnboarded: user.isOnboarded
            }
        })
    } catch (error) {
        logger.error("Error registering user", {
            error: (error instanceof Error) ? error.message : error,
            stack: error instanceof Error ? error.stack : null
        })
        sendResponse({
            res,
            statusCode: 500,
            success: false,
            message: "Internal server error"
        })
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { data, error } = validateLoginData(req.body)
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

        const { email, password } = data;

        const user = await User.findOne({ email });

        if (!user) {
            logger.warn("User does not exist, Register an account");
            sendResponse({
                res,
                success: false,
                message: "User does not exist, Register an account.",
                statusCode: 400
            })

            return;
        }

        if (user && (await user.comparePassword(password))) {
            const { accessToken, refreshToken } = await generateToken(user)

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: env.NODE_ENV === "production" ? true : false,
                sameSite: env.NODE_ENV === "production" ? "none" : "lax",
                maxAge: 3 * 24 * 60 * 60 * 1000
            });


            sendResponse({
                res,
                statusCode: 200,
                message: "Login Successful!!",
                data: {
                    userId: user._id,
                    username: user.username,
                    token: accessToken,
                    isOnboarded: user.isOnboarded
                }
            })
            return;
        } else {
            sendResponse({
                res,
                statusCode: 400,
                message: "Invalid Password",
                success: false
            })
            return
        }

    } catch (error) {
        logger.error("Error logging in user", {
            error: (error instanceof Error) ? error.message : error,
            stack: error instanceof Error ? error.stack : null
        })
        sendResponse({
            res,
            statusCode: 500,
            success: false,
            message: "Internal server error"
        })
    }
}

export const logoutUser = async (req: Request, res: Response) => {
    try {
        const cookies = req.cookies;
        if (!cookies?.refreshToken) {
            sendResponse({
                res,
                message: "Cookie cleared"
            })
            return
        }

        const refreshToken = cookies.refreshToken;

        await RefreshToken.deleteOne({ token: refreshToken });
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: env.NODE_ENV === "production" ? true : false,
            sameSite: env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 3 * 24 * 60 * 60 * 1000
        })

        sendResponse({
            res,
            message: "Cookie cleared"
        })
        return

    } catch (error) {
        logger.error("Error logging out user", {
            error: (error instanceof Error) ? error.message : error,
            stack: error instanceof Error ? error.stack : null
        })
        sendResponse({
            res,
            statusCode: 500,
            success: false,
            message: "Internal server error"
        })
    }
}

export const onboardUser = async (req: AuthenticatedRequest, res: Response) => {
    const { data, error } = validateOnboardingData(req.body)
    
    try {
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

        let onboardingData: Partial<IUser> = {
            preferredGenres: data.preferredGenres,
            isOnboarded: true,
            ...(data?.bio ? { bio: data?.bio } : {})
          };
          
          if (req.file) {
            const { filename, path } = req.file as Express.Multer.File;
            onboardingData.imageUrl = {
              path,
              filename
            };
          }
          
        const user = await User.findByIdAndUpdate(
            req.userId,
            { $set: onboardingData },
            { new: true }
        )

        if (!user) {
            logger.warn("Couldn't complete onboarding process, try again.")
            sendResponse({
                res,
                statusCode: 400,
                message: "Couldn't complete onboarding process, try again.",
                success: false
            })
            return
        }

        sendResponse({
            res,
            message: "Onboarding Successful, Welcome.",
            data: {
                ...(req.file && {avatarUrl: user.imageUrl.path}),
                isOnboarded: user.isOnboarded
            }
        })
    } catch (error) {
        logger.error("Error onboarding user", {
            error: (error instanceof Error) ? error.message : error,
            stack: error instanceof Error ? error.stack : null
        })
        sendResponse({
            res,
            statusCode: 500,
            success: false,
            message: "Internal server error"
        })
    }
}