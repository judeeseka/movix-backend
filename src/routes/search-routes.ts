import { searchMulti } from "../controllers/search-controller";

const express = require("express");
const router = express.Router()

router.get("/multi", searchMulti)

export default router;