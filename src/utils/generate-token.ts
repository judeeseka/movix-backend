import { Document } from "mongoose";
import jwt from "jsonwebtoken"
import { IUserDocument } from "../interfaces/interface";
import { env } from "../config/env-config";
import crypto from "crypto"
import RefreshToken from "../models/refresh-token";


export const generateToken = async (user: IUserDocument) => {
    const accessToken = jwt.sign({
        userId: user._id,
        username: user.username
    }, env.JWT_SECRET, {expiresIn: "15m"})

    const refreshToken = crypto.randomBytes(40).toString("hex")
    const expiresAt = new Date().setDate(new Date().getDate() + 3)

    await RefreshToken.create({
        token: refreshToken,
        user: user._id,
        expiresAt
    })

    return { accessToken, refreshToken }
}