import express from "express";
import { getAuthData, loginUser, logoutUser, onboardUser, refresh, registerUser } from "../controllers/auth-controller";
import upload from "../config/cloudinary";
import { authenticateUser } from "../middleware/auth-user";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/refresh", refresh)
router.post("/onboard", authenticateUser, upload.single("profileImg"), onboardUser)
router.get("/me", authenticateUser, getAuthData)
export default router;