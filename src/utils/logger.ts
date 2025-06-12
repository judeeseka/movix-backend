import winston from "winston"
import envConfig from "../config/envConfig";

const logger = winston.createLogger({
    level: envConfig.nodeEnv === "production" ? "info" : "debug",
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