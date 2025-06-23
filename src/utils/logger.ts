import winston from "winston"
import { env } from "../config/env-config";

const logger = winston.createLogger({
    level: env.NODE_ENV === "production" ? "info" : "debug",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({stack: true}),
        winston.format.splat(),
        winston.format.json()
    ),
    transports : [
         new winston.transports.Console({
              format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
              ),
            }),
    ]
})

export default logger;