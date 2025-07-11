import express from "express"
import { authenticateUser } from "../middleware/auth-user";
import { getUserInfo, updateUserInfo } from "../controllers/user-controller";
import upload from "../config/cloudinary";
const router = express.Router();

router.get("/", authenticateUser, getUserInfo)
router.patch("/me", authenticateUser, upload.single("avatarImg"), updateUserInfo)

export default router;