import dotenv from "dotenv";

dotenv.config();

interface ENVConfig {
    port : number;
    nodeEnv: string;
}

const envConfig: ENVConfig = {
    port: Number(process.env.PORT),
    nodeEnv: process.env.NODE_ENV || "development"
}

export default envConfig;