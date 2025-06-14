import express from "express";
import helmet from "helmet";
import cors from "cors";
import { env } from "./config/envConfig";
import logger from "./utils/logger";
import errorHandler from "./middleware/errorHandler";
import movieRoutes from "./routes/movie-routes"

const app = express();

app.use(helmet());
app.use(cors())
app.use(express.json());

app.use("/api/movies", movieRoutes)

app.use(errorHandler)

app.listen(env.PORT, () => {
    logger.info(`Server running on port ${env.PORT}`)
})