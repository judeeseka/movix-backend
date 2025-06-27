import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.string().transform(Number).default("3000"),
  TMDB_ACCESS_TOKEN: z.string().min(1, "TMDB token is required"),
  JWT_SECRET: z.string().min(1, "JWT secret is required"),
  MONGO_URI: z.string().min(1, "Mongo URI is required"),
  CLOUDINARY_CLOUD_NAME: z.string().min(1, "Cloudinary cloud name is required"),
  CLOUDINARY_API_KEY: z.string().min(1, "Cloudinary api key is required"),
  CLOUDINARY_API_SECRET: z.string().min(1, "Cloudinary api secret is required"),
});


const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.warn(`Invalid env variables: ${parsedEnv.error.format()}`);
  process.exit(1)
}

export const env = parsedEnv.data;