import mongoose from "mongoose";
import bcrypt from "bcrypt"
import { IUserDocument } from "../interfaces/interface";

const UserSchema = new mongoose.Schema<IUserDocument>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true})

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePassword = async function (userPassword: string) {
    return await bcrypt.compare(this.password, userPassword)
}

const User = mongoose.model<IUserDocument>("User", UserSchema)

export default User