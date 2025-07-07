import express from "express"
import { authenticateUser } from "../middleware/auth-user";
import { getUserInfo } from "../controllers/user-controller";
const router = express.Router();

router.get("/", authenticateUser, getUserInfo)

export default router;