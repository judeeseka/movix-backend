import mongoose from "mongoose";
import { IReview } from "../interfaces/interface";

const ReviewSchema = new mongoose.Schema<IReview>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  mediaId: {
    type: String,
    required: true
  },
  mediaType: {
    type: String,
    enum: ["movie", "tv"],
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    trim: true
  }
}, { timestamps: true });

const Review = mongoose.model<IReview>("Review", ReviewSchema);

export default Review