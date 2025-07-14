import express from "express"
import { authenticateUser } from "../middleware/auth-user";
import { getUserFavouriteInfo, getUserInfo, updateUserFavouriteInfo, updateUserInfo } from "../controllers/user-controller";
import upload from "../config/cloudinary";
const router = express.Router();

router.get("/", authenticateUser, getUserInfo)
router.patch("/me", authenticateUser, upload.single("avatarImg"), updateUserInfo)
router.get("/me/favourites", authenticateUser, getUserFavouriteInfo),
router.patch("/me/favourites", authenticateUser, updateUserFavouriteInfo)

export default router;