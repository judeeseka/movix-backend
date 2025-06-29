import mongoose from "mongoose";
import { IRefreshTokenDocument } from "../interfaces/interface";

const RefreshTokenSchema = new mongoose.Schema<IRefreshTokenDocument>({
    token: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
}, {timestamps: true})

RefreshTokenSchema.index({expiresAt: 1}, {expireAfterSeconds: 0})

const RefreshToken = mongoose.model<IRefreshTokenDocument>("RefreshToken", RefreshTokenSchema)

export default RefreshToken