import mongoose from "mongoose";
import bcrypt from "bcrypt"
import { IUser } from "../interfaces/interface";

const UserSchema = new mongoose.Schema<IUser>({
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
    },
    bio: {
        type: String
    },
    profileImage: {
        path: { type: String },
        filename: { type: String }
    },
    preferredGenres: {
        type: [String]
    },
    isOnboarded: {
        type: Boolean,
        required: true,
        default: false
    },
    favorites: [
        {
            id: { type: Number },
            title: { type: String },
            name: { type: String },
            first_air_date: { type: Date },
            release_date: { type: Date },
            poster_path: { type: String },
            vote_average: { type: Number },
            media_type: { type: String, enum: ["movie", "tv"] }
        }
    ],
    watchLists: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                auto: true
            },
            name: {
                type: String,
                trim: true
            },
            media: [
                {
                    mediaId: { type: String },
                    mediaType: { type: String, enum: ["movie", "tv"] }
                }
            ]
        }
    ]
    
}, {timestamps: true})

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePassword = async function (userPassword: string) {
    return await bcrypt.compare(userPassword, this.password)
}

const User = mongoose.model<IUser>("User", UserSchema)

export default User