import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import { env } from "./config/env-config";
import logger from "./utils/logger";
import errorHandler from "./middleware/error-handler";
import movieRoutes from "./routes/movie-routes"
import seriesRoutes from "./routes/series-routes"
import searchRoutes from "./routes/search-routes"
import authRoutes from "./routes/auth-routes";
import userRoutes from "./routes/user-routes";
import { connectToDb } from "./config/db";

const app = express();

connectToDb()

app.use(helmet());
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5174",
    credentials: true
}))
app.use(express.json());

app.use("/api/movies", movieRoutes)
app.use("/api/series", seriesRoutes)
app.use("/api/search", searchRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)

app.use(errorHandler)

app.listen(env.PORT, () => {
    logger.info(`Server running on port ${env.PORT}`)
})