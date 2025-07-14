import { Request } from "express";
import { Document, Types } from "mongoose";

export interface IUser extends Document {
    name: string,
    email: string;
    username: string;
    password: string;
    bio: string;
    profileImage: {
        path: string;
        filename: string;
    }
    preferredGenres: string[]
    isOnboarded: boolean;
    favorites: {
        id: number,
        title?: string;
        name?: string;
        first_air_date?: string;
        release_date?: string;
        poster_path: string;
        vote_average: number;
        media_type: "movie" | "tv";
    }[];
    watchLists: {
        _id: Types.ObjectId;
        name: string;
        media: {
            mediaId: string;
            mediaType: "movie" | "tv"
        }[]
    }[]
    comparePassword(userPassword: string): Promise<boolean>
}

export interface AuthenticatedRequest extends Request {
    userId?: string;
}

export interface IRefreshToken extends Document {
    token: string;
    expiresAt: Date;
    user: {
        _id: string;
        username: string
    }
}

export interface IReview extends Document {
    userId: Types.ObjectId;
    mediaId: string;
    mediaType: "movie" | "tv";
    rating: number;
    comment?: string;
    createdAt: Date;
    updatedAt: Date;
}