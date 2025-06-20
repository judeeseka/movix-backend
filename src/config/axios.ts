import axios from "axios";
import { env } from "./envConfig";

const tmdbApi = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        Authorization: `Bearer ${env.TMDB_ACCESS_TOKEN}`
    }
},)

export default tmdbApi