import "dotenv/config"
import ApiError from "../utils/ApiError.js"

if (!process.env.DATABASE_URI) {
    throw new ApiError(500, false, "DATABASE_URI is not defined in environment variables")
}
if (!process.env.ACCESS_TOKEN) {
    throw new ApiError(500, false, "ACCESS_TOKEN is not defined in environment variables")
}

if (!process.env.REFRESH_TOKEN) {
    throw new ApiError(500, false, "REFRESH_TOKEN is not defined in environment variables")
}
if (!process.env.GOOGLE_CLIENT_ID) {
    throw new ApiError(500, false, "GOOGLE_CLIENT_ID is not defined in environment variables")
}
if (!process.env.GOOGLE_CLIENT_SECRET) {
    throw new ApiError(500, false, "GOOGLE_CLIENT_SECRET is not defined in environment variables")
}

if (!process.env.GOOGLE_REFRESH_TOKEN) {
    throw new ApiError(500, false, "GOOGLE_REFRESH_TOKEN is not defined in environment variables")
}
if (!process.env.EMAIL_USER) {
    throw new ApiError(500, false, "EMAIL_USER is not defined in environment variables")
}
export const config = {
    DATABASE_URI: process.env.DATABASE_URI,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN,
    EMAIL_USER: process.env.EMAIL_USER
}