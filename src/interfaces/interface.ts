import { Request } from "express";
import { Document } from "mongoose";

export interface IUser {
    name: string,
    email: string;
    username: string;
    password: string;
    bio: string;
    imageUrl: {
        path: string;
        filename: string;
    }
    preferredGenres: string[]
    isOnboarded: boolean
}

export interface IUserDocument extends IUser, Document {
    comparePassword(userPassword: string): Promise<boolean>
}

export interface AuthenticatedRequest extends Request {
    userId?: string;
  }