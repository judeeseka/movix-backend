import mongoose from "mongoose"
import { env } from "./env-config"
import logger from "../utils/logger"

export const connectToDb = async () => {
    try {
        await mongoose.connect(env.MONGO_URI)

        logger.info("Connected to DB!!")
    } catch (error) {
        logger.error("Error connecting to DB", {
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : null
        })
        process.exit(1)
    }
}