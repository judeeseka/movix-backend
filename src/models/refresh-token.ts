import mongoose from "mongoose";
import { IRefreshToken } from "../interfaces/interface";

const RefreshTokenSchema = new mongoose.Schema<IRefreshToken>({
    token: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
}, {timestamps: true})

RefreshTokenSchema.index({expiresAt: 1}, {expireAfterSeconds: 0})

const RefreshToken = mongoose.model<IRefreshToken>("RefreshToken", RefreshTokenSchema)

export default RefreshToken