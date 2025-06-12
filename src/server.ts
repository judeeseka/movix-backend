import envConfig from "./config/envConfig";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import logger from "./utils/logger";

const app = express();
const PORT = envConfig.port;

app.use(helmet());
app.use(cors())
app.use(express.json());

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
})