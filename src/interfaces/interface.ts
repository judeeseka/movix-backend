import { Document } from "mongoose";

export interface IUser {
    name: string,
    email: string;
    username: string;
    password: string;
}

export interface IUserDocument extends IUser, Document {
    comparePassword(userPassword: string): Promise<boolean>
}