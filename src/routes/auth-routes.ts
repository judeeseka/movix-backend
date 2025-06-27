import express from "express";
import { loginUser, logoutUser, onboardUser, registerUser } from "../controllers/auth-controller";
import upload from "../config/cloudinary";
import { authenticateUser } from "../middleware/auth-user";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/onboard", authenticateUser, upload.single("profileImg"), onboardUser)

export default router;