import { v2 as cloudinary } from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import multer from "multer"
import { env } from "./env-config"

cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, res) => ({
        folder: "movix",
        allowed_formats: ["jpg", "png", "jpeg"]
    })
  });

const upload = multer({ storage })

export default upload